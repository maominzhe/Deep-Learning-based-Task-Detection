# Deep-Learning-based-assemblytask-Detection
the aim of this project to develop a webapp with task detection system for manual assembly processes.
To train model from sketch use 'train.py' To test pre-trained model use 'predict_video.py', before testing please download trained model and sample test video from google drive link given in the article.
To test trained model using webcam (real-time video) use 'predict_video_realtime.py'.

## Main features:
<ul>
<li><p>identify the current assembly step with webcam</p></li>
<li><p>provide assisting information for further steps</p></li>
<li><p>errors should be detected with warning signal</p></li>
<li><p>realtime communication over MQTT</p></li>
</ul>

## Structure
![mqtt (1)](https://user-images.githubusercontent.com/51397883/89799627-03fb4980-db2e-11ea-8abe-438b8ab11e9d.png)

## Webapp
<img width="700" alt="webapp" src="https://user-images.githubusercontent.com/51397883/89800436-16c24e00-db2f-11ea-9fb1-eb498297fff1.png">

## Example workflow
![workflow](https://user-images.githubusercontent.com/51397883/89799946-65231d00-db2e-11ea-9721-47f30f1e2f08.png)

We used installing linear guide as an example task, which consists of six steps coresponding to five classes in machine learning model. 

## Train and test data
manually recorded 12 videos for each class, convert them into images using ffmpeg, 70% of them are used for training, 20% are for testing and 10% are for validation.

