"""This is a script offered for users who want to make a 
fine-grained bird classification by using our recognizition model."""

from convert_video_to_frames import split_video_into_images
from predict import prediction


""" 
This is the main function offered for users to call
@param  video_path str: video path for classification
@return bird_label str: label of bird recongnized by our model
"""
def run(video_path):
    image_url_list = split_video_into_images(video_path)
    return prediction(image_url_list)


run("/root/MiniProgram/BirdClassification/videos/test.mp4")