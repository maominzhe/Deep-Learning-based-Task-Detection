import pickle
import argparse
from imutils import paths
import numpy as np
import cv2
import os
from sklearn.preprocessing import LabelBinarizer



ap = argparse.ArgumentParser()
ap.add_argument("-d", "--dataset", required=True,
	help="path to input dataset")
# ap.add_argument("-m", "--model", required=True,
# 	help="path to output serialized model")
ap.add_argument("-l", "--label-bin", required=True,
	help="path to output label binarizer")
ap.add_argument("-e", "--epochs", type=int, default=25,
	help="# of epochs to train our network for")
ap.add_argument("-p", "--plot", type=str, default="plot.png",
	help="path to output loss/accuracy plot")
args = vars(ap.parse_args())

# initialize the set of labels from the spots activity dataset we are
# going to train our network on
LABELS = list(["measuring_r_1", "measuring_r_2", "measuring_w_1", "measuring_w_2","sawing_r1","sawing_r2",
"sawing_w_1","sawing_w_2","screwing_r_1","screwing_r_2","screwing_w_1","screwing_w_2"])

# grab the list of images in our dataset directory, then initialize
# the list of data (i.e., images) and class images
print("[INFO] loading images...")
imagePaths = list(paths.list_images(args["dataset"]))
data = []
labels = []
'''
# loop over the image paths
for imagePath in imagePaths:
	# extract the class label from the filename
	label = imagePath.split(os.path.sep)[-2]

	# if the label of the current image is not part of of the labels
	# are interested in, then ignore the image
	if label not in LABELS:
		continue

	# load the image, convert it to RGB channel ordering, and resize
	# it to be a fixed 224x224 pixels, ignoring aspect ratio
	image = cv2.imread(imagePath)
	image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
	image = cv2.resize(image, (224, 224))

	# update the data and labels lists, respectively
	data.append(image)
	labels.append(label)
	print("the 2nd label:")
	print(labels)
# convert the data and labels to NumPy arrays
data = np.array(data)
labels = np.array(labels)
'''
# perform one-hot encoding on the labels
lb = LabelBinarizer()
labels = lb.fit_transform(LABELS)
print("the labels are")
print(labels.shape)
print(labels[1])

f = open(args["label_bin"], "wb")
print(f)
f.write(pickle.dumps(labels))
f.close()

lb_list = pickle.loads(open(args["label_bin"], "rb").read())
tmp = lb.inverse_transform(lb_list)

print(tmp[3])