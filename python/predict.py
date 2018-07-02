"""Predict the class of bird image using the fine-trained model."""
from __future__ import division
from __future__ import print_function
import tensorflow as tf
from vgg16 import vgg16
from utils import get_batch    
import csv


def predict(image_url_list,batch_size = 8):
    num_images = len(image_url_list)
    num_batches = num_images//batch_size if num_images%batch_size == 0 else num_images//batch_size + 1 
    model = vgg16()
    model_predictions = []
    with tf.Session() as sess:
        saver = tf.train.import_meta_graph('./checkpoints/Mymodel-8-8.meta')  #restore graph structure
        saver.restore(sess, tf.train.latest_checkpoint('./checkpoints'))    #restore parameters
        for i in range(num_batches):
            x_batch, _ = get_batch(height=model.height, width=model.width)
            predicted = sess.run([ model.pred], feed_dict={model.x:x_batch})
            model_predictions.extend(predicted[0])
    save_prediction(model_predictions)
    

def save_prediction(model_predictions):
     with open('result.csv',"w") as f:
        writer = csv.writer(f, delimiter=',',  quotechar='"', quoting=csv.QUOTE_ALL)
        row = ['ImageId', 'Category']
        writer.writerow(row)
        for idx,category in enumerate(model_predictions):
            row = []
            row.append(idx)
            row.append(category)
            writer.writerow(row)