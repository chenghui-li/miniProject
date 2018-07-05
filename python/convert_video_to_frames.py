"""This script is used to split video into image frames.
@Author: leroyi
@Date: 2018-06-29
"""
#import modules needed
import os 
import imageio


def split_video_into_images(video_path):
        """Split video into image frames.
        
        Args:
            video_path str: offer the path of video which needs to split
        Return:
            image_url_list []: the url list of splitted images
        """
        # imageio.plugins.ffmpeg.download()
        vid = imageio.get_reader(video_path, 'ffmpeg')
        image_folder = "/root/MiniProgram/BirdClassification/splitted_images/"
        #image_folder = "/data/leroyyi/MiniProgram/BirdClassification/splitted_images/"
        image_folder = image_folder + video_path.split("/")[-1].split(".")[0] + "/"
        # create directory to save the images
        if not os.path.exists(image_folder):
            os.makedirs(image_folder)
        # image_url_list to return 
        image_url_list = []
        for num, img in enumerate(vid):
            image_url = image_folder + str(num) + ".jpg"
            imageio.imwrite(image_url, img)
            image_url_list.append(image_url)
        return image_url_list
    
# split_video_into_images("/root/MiniProgram/BirdClassification/videos/test.mp4")