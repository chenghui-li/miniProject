"""
Predict the class of bird image using the fine-trained model.
@Author:leroyyi
@Date:2018-7-1
"""
#import needed modules
from __future__ import division
from __future__ import print_function
import csv
import os
import pandas as pd
import numpy as np
import tensorflow as tf
from vgg16 import vgg16
from utils import get_batch    


def prediction(image_url_list,batch_size = 4):
    """Reload the fine-trained model to predict the image recognition result.
    
       Args:
           image_url_list: list of image urls splitted from the uploaded video
           batch_size: size of batch for each round of train
    """
    num_images = len(image_url_list)
    num_batches = num_images//batch_size if num_images%batch_size == 0 else num_images//batch_size + 1 
    model = vgg16()
    model_predictions = []
    generator = _generate(image_url_list, batch_size)
    with tf.Session() as sess:
        saver = tf.train.import_meta_graph('./checkpoints/Mymodel-9-9.meta')  #restore graph structure
        saver.restore(sess, tf.train.latest_checkpoint('./checkpoints/'))      #restore parameters
        sess.run(tf.global_variables_initializer())
        for i in range(num_batches):
            x_batch, _ = get_batch(generator, "test", height=model.height, width=model.width)
            predicted = sess.run([ model.pred], feed_dict={model.x:x_batch})
            model_predictions.extend(predicted[0])
    save_prediction(model_predictions)
    return get_result()
    
    
def _generate(image_url_list, batch_size):
    """generate input data for model testing"""
        loop = 0
        idx_list = []
        for item in range(len(image_url_list)):
            idx_list.append(item)
        max_size = len(image_url_list)
        while True:
            if loop + batch_size < max_size:
                gen_list = idx_list[loop:loop+ batch_size]
            else:
                last_iter = loop + batch_size - max_size
                gen_list = idx_list[loop:max_size] 
                loop = 0
                #_shuffle()

            loop += batch_size
            assert(len(gen_list) <= batch_size)
            yield ([ image_url_list[x] for x in gen_list ], 
                           np.array( [[ 0,0,224,224] for x in gen_list] ))


def save_prediction(model_predictions):
    """Save the prediction results into csv file
    
    Args:
        model_predictions: the results of model prediction, in the form of list
    """
    #delete the result.csv and then recreate it to save new prediction results
    if os.path.exists("result.csv"):
        os.remove("result.csv")
    file = open('result.csv','w')
    writer = csv.writer(file, delimiter=',',  quotechar='"', quoting=csv.QUOTE_ALL)
    row = ['ImageId', 'Category']
    writer.writerow(row)
    for idx,category in enumerate(model_predictions):
        row = []
        row.append(idx)
        row.append(category)
        writer.writerow(row)
    file.close()
       
            
def get_result():
    """return the specific bird recognization result"""
    df = pd.read_csv("result.csv", sep=',')
    bird_label = int(pd.value_counts(df['Category']).sort_values(axis=0, ascending=False).index[0])
    # find the corresponding bird label for the prediction result
    bird_label_dict = {
            1:'Black_footed_Albatross',
            2:'Laysan_Albatross',
            3:'Sooty_Albatross',
            4:'Groove_billed_Ani',
            5:'Crested_Auklet',
            6:'Least_Auklet',
            7:'Parakeet_Auklet',
            8:'Rhinoceros_Auklet',
            9:'Brewer_Blackbird',
            10:'Red_winged_Blackbird',
            11:'Rusty_Blackbird',
            12:'Yellow_headed_Blackbird',
            13:'Bobolink',
            14:'Indigo_Bunting',
            15:'Lazuli_Bunting',
            16:'Painted_Bunting',
            17:'Cardinal',
            18:'Spotted_Catbird',
            19:'Gray_Catbird',
            20:'Yellow_breasted_Chat',
            21:'Eastern_Towhee',
            22:'Chuck_will_Widow',
            23:'Brandt_Cormorant',
            24:'Red_faced_Cormorant',
            25:'Pelagic_Cormorant',
            26:'Bronzed_Cowbird',
            27:'Shiny_Cowbird',
            28:'Brown_Creeper',
            29:'American_Crow',
            30:'Fish_Crow',
            31:'Black_billed_Cuckoo',
            32:'Mangrove_Cuckoo',
            33:'Yellow_billed_Cuckoo',
            34:'Gray_crowned_Rosy_Finch',
            35:'Purple_Finch',
            36:'Northern_Flicker',
            37:'Acadian_Flycatcher',
            38:'Great_Crested_Flycatcher',
            39:'Least_Flycatcher',
            40:'live_sided_Flycatcher',
            41:'Scissor_tailed_Flycatcher',
            42:'Vermilion_Flycatcher',
            43:'Yellow_bellied_Flycatcher',
            44:'Frigatebird',
            45:'Northern_Fulmar',
            46:'Gadwall',
            47:'American_Goldfinch',
            48:'European_Goldfinch',
            49:'Boat_tailed_Grackle',
            50:'Eared_Grebe',
            51:'Horned_Grebe',
            52:'Pied_billed_Grebe',
            53:'Western_Grebe',
            54:'Blue_Grosbeak',
            55:'Evening_Grosbeak',
            56:'Pine_Grosbeak',
            57:'Rose_breasted_Grosbeak',
            58:'Pigeon_Guillemot',
            59:'California_Gull',
            60:'Glaucous_winged_Gull',
            61:'Heermann_Gull',
            62:'Herring_Gull',
            63:'Ivory_Gull',
            64:'Ring_billed_Gull',
            65:'Slaty_backed_Gull',
            66:'Western_Gull',
            67:'Anna_Hummingbird',
            68:'Ruby_throated_Hummingbird',
            69:'Rufous_Hummingbird',
            70:'Green_Violetear',
            71:'Long_tailed_Jaeger',
            72:'Pomarine_Jaeger',
            73:'Blue_Jay',
            74:'Florida_Jay',
            75:'Green_Jay',
            76:'Dark_eyed_Junco',
            77:'Tropical_Kingbird',
            78:'Gray_Kingbird',
            79:'Belted_Kingfisher',
            80:'Green_Kingfisher',
            81:'Pied_Kingfisher',
            82:'Ringed_Kingfisher',
            83:'White_breasted_Kingfisher',
            84:'Red_legged_Kittiwake',
            85:'Horned_Lark',
            86:'Pacific_Loon',
            87:'Mallard',
            88:'Western_Meadowlark',
            89:'Hooded_Merganser',
            90:'Red_breasted_Merganser',
            91:'Mockingbird',
            92:'Nighthawk',
            93:'Clark_Nutcracker',
            94:'White_breasted_Nuthatch',
            95:'Baltimore_Oriole',
            96:'Hooded_Oriole',
            97:'rchard_Oriole',
            98:'Scott_Oriole',
            99:'venbird',
            100:'Brown_Pelican',
            101:'White_Pelican',
            102:'Western_Wood_Pewee',
            103:'Sayornis',
            104:'American_Pipit',
            105:'Whip_poor_Will',
            106:'Horned_Puffin',
            107:'Common_Raven',
            108:'White_necked_Raven',
            109:'American_Redstart',
            110:'Geococcyx',
            111:'Loggerhead_Shrike',
            112:'Great_Grey_Shrike',
            113:'Baird_Sparrow',
            114:'Black_throated_Sparrow',
            115:'Brewer_Sparrow',
            116:'Chipping_Sparrow',
            117:'Clay_colored_Sparrow',
            118:'House_Sparrow',
            119:'Field_Sparrow',
            120:'Fox_Sparrow',
            121:'Grasshopper_Sparrow',
            122:'Harris_Sparrow',
            123:'Henslow_Sparrow',
            124:'Le_Conte_Sparrow',
            125:'Lincoln_Sparrow',
            126:'Nelson_Sharp_tailed_Sparrow',
            127:'Savannah_Sparrow',
            128:'Seaside_Sparrow',
            129:'Song_Sparrow',
            130:'Tree_Sparrow',
            131:'Vesper_Sparrow',
            132:'White_crowned_Sparrow',
            133:'White_throated_Sparrow',
            134:'Cape_Glossy_Starling',
            135:'Bank_Swallow',
            136:'Barn_Swallow',
            137:'Cliff_Swallow',
            138:'Tree_Swallow',
            139:'Scarlet_Tanager',
            140:'Summer_Tanager',
            141:'Artic_Tern',
            142:'Black_Tern',
            143:'Caspian_Tern',
            144:'Common_Tern',
            145:'Elegant_Tern',
            146:'Forsters_Tern',
            147:'Least_Tern',
            148:'Green_tailed_Towhee',
            149:'Brown_Thrasher',
            150:'Sage_Thrasher',
            151:'Black_capped_Vireo',
            152:'Blue_headed_Vireo',
            153:'Philadelphia_Vireo',
            154:'Red_eyed_Vireo',
            155:'Warbling_Vireo',
            156:'White_eyed_Vireo',
            157:'Yellow_throated_Vireo',
            158:'Bay_breasted_Warbler',
            159:'Black_and_white_Warbler',
            160:'Black_throated_Blue_Warbler',
            161:'Blue_winged_Warbler',
            162:'Canada_Warbler',
            163:'Cape_May_Warbler',
            164:'Cerulean_Warbler',
            165:'Chestnut_sided_Warbler',
            166:'Golden_winged_Warbler',
            167:'Hooded_Warbler',
            168:'Kentucky_Warbler',
            169:'Magnolia_Warbler',
            170:'Mourning_Warbler',
            171:'Myrtle_Warbler',
            172:'Nashville_Warbler',
            173:'Orange_crowned_Warbler',
            174:'Palm_Warbler',
            175:'Pine_Warbler',
            176:'Prairie_Warbler',
            177:'Prothonotary_Warbler',
            178:'Swainson_Warbler',
            179:'Tennessee_Warbler',
            180:'Wilson_Warbler',
            181:'Worm_eating_Warbler',
            182:'Yellow_Warbler',
            183:'Northern_Waterthrush',
            184:'Louisiana_Waterthrush',
            185:'Bohemian_Waxwing',
            186:'Cedar_Waxwing',
            187:'American_Three_toed_Woodpecker',
            188:'Pileated_Woodpecker',
            189:'Red_bellied_Woodpecker',
            190:'Red_cockaded_Woodpecker',
            191:'Red_headed_Woodpecker',
            192:'Downy_Woodpecker',
            193:'Bewick_Wren',
            194:'Cactus_Wren',
            195:'Carolina_Wren',
            196:'House_Wren',
            197:'Marsh_Wren',
            198:'Rock_Wren',
            199:'Winter_Wren',
            200:'Common_Yellowthroat'
    }
    bird_label = bird_label_dict.get(bird_label, 'Unknown Bird')
    return bird_label
    