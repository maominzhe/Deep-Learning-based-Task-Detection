var connected_flag = 0
var mqtt;
var reconnectTimeout = 2000;
var host = "test.mosquitto.org";
var port = 8080;
var err = "wrong";
var trans = "transition";
var label = ["cleaning","measuring","mounting","vertically screwing","horizontally screwing","finished"]


console.log('im here sketch!')

function onConnectionLost() {
    console.log("connection lost");
    document.getElementById("status").innerHTML = "Connection Lost";
    document.getElementById("status").style.color = "red";
    document.getElementById("messages").innerHTML = "Connection Lost";
    connected_flag = 0;
}

function onFailure(message) {
    console.log("Failed");
    document.getElementById("messages").innerHTML = "Connection Failed- Retrying";
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(r_message) {
    if (r_message.payloadString.startsWith("next")) {
        var msg_box = document.getElementById("messages");
        var msg_video = document.getElementById("video-message");
        out_msg = r_message.payloadString + "<br>";
        msg_box.innerHTML = out_msg_for_box;
        msg_video.innerHTML = out_msg;
    }
    else if (r_message.payloadString.startsWith("task")) {
        var msg_box = document.getElementById("messages");
        var msg_video = document.getElementById("video-message");
        out_msg = r_message.payloadString + "<br>";
        msg_box.innerHTML = out_msg_for_box;
        msg_video.innerHTML = out_msg;
    }

    else if (r_message.payloadString!=err) {
        //console.log('im at if')
        out_msg = r_message.payloadString + "<br>";
        //out_msg = out_msg + "Topic: " + r_message.destinationName;
        //out_msg_for_box = out_msg + "cunrrent task: linear guide" 
        //console.log("Message received ",r_message.payloadString);
        var id = parseInt(out_msg.slice(0,2));
        console.log(id);
        out_msg_for_box = "Next Step:" + label[id+1]+"<br>" ;
        //console.log(out_msg.slice(0,2));
        var msg_box = document.getElementById("messages");
        var msg_video = document.getElementById("video-message");
        msg_box.innerHTML = out_msg_for_box;
        msg_video.style.color = "black";
        msg_box.style.color = "black";
        msg_video.innerHTML = out_msg;
        
    }
    else if (r_message.payloadString==err){
        out_msg = "MOUNTING HORIZONTALLY!";
        console.log('im at else')
        var msg = document.getElementById("messages");
        var msg_video = document.getElementById("video-message");
        msg_video.innerHTML = out_msg;
        msg_video.style.color = "red";
        msg.innerHTML = out_msg;
        msg.style.color = "red";

    }
    else{

    }
    console.log(r_message.payloadString+'mao');
}

function onConnected(recon, url) {
    console.log(" in onConnected " + reconn);
}

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    document.getElementById("video-message").innerHTML = "Connected to " + host + "on port" + port;
    document.getElementById("messages").innerHTML = "Connected to " + host + "on ports" + port;
    connected_flag = 1
    var status = document.getElementById("status")
    //document.getElementById("status").innerHTML = "Connected";
    status.innerHTML = "Connected";
    status.style.color = "green";
    console.log("on Connect " + connected_flag);
    //mqtt.subscribe("sensor1");
    //message = new Paho.MQTT.Message("Hello World");
    //message.destinationName = "sensor1";
    //mqtt.send(message);
}

function MQTTconnect() {
    document.getElementById("messages").innerHTML = "";
    var s = document.forms["connform"]["server"].value;
    var p = document.forms["connform"]["port"].value;
    if (p != "") {
        console.log("ports");
        port = parseInt(p);
        console.log("port" + port);
    }
    if (s != "") {
        host=s;
        console.log("host");
    }


    console.log("connecting to " + host + " " + port);
    mqtt = new Paho.MQTT.Client(host, port, "clientjsaaa");
    //document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,

    };

    mqtt.onConnectionLost = onConnectionLost;
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnected = onConnected;

    mqtt.connect(options);

    return false;
}

function sub_topics() {
    document.getElementById("messages").innerHTML = "";
    if (connected_flag == 0) {
        out_msg = "<b>Not Connected so can't subscribe</b>"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    var stopic = document.forms["subs"]["topic_select"].value;
    console.log("Subscribing to topic =" + stopic);
    mqtt.subscribe(stopic);
    return false;
}

function send_message() {
    document.getElementById("messages").innerHTML = "";
    if (connected_flag == 0) {
        out_msg = "<b>Not Connected so can't send</b>"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    var msg = document.forms["smessage"]["message"].value;
    console.log(msg);

    var topic = document.forms["smessage"]["Ptopic"].value;
    message = new Paho.MQTT.Message(msg);
    if (topic == "")
        message.destinationName = "test-topic"
    else
        message.destinationName = topic;
    mqtt.send(message);
    return false;
}