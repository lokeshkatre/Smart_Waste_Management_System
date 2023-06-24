import urllib.request
import pymongo
import os
import winsound 
import time
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

mongoAtlasUrl= os.environ.get('ATLAS_URL')
client = pymongo.MongoClient(mongoAtlasUrl)

try: 
    client.admin.command('ping')
    print('Connection to the db successful')
except:
    print('Connection to db failed')

db = client["Explo2"] 
collection = db["Explo_distance_data2"] 

exploData={
    "_id":1,
    "depth": 0 ,
    "Time": 1
}

url = "http://192.168.43.133/"
i=210

def get_data():
    global data

    n = urllib.request.urlopen(url).read()
    n = n.decode("utf-8")
    data = n

while True:
    get_data()
    
    dt_time= datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    exploData["_id"]=i
    exploData["depth"]=data
    exploData["Time"]=dt_time
    print(exploData["depth"])
    collection.insert_one(exploData)
    i=i+1
    if float(data) < 5:
         winsound.Beep(1000, 7000)
         time.sleep(0)



