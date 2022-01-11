import json
import datetime
import time
import os
import dateutil.parser
import logging
from botocore.vendored import requests

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def getEpitechActivities():
    intra_key = "" # faut mettre la clé api intra ici auth-XXXX
    month_id = datetime.datetime.now().month
    intra_activities = requests.get(f"https://intra.epitech.eu/%7Bintra_key%7D/planning/load?start=2021-%7Bmonth_id%7D-01&end=2021-%7Bmonth_id%7D-31&format=json%22)
    activities = []
    for activity in intra_activities.json():
        if activity["titlemodule"] not in activities:
            activities.append(activity["titlemodule"])
    return {
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": "There is " + str(len(activities)) + " different activities planned this month:\r\n" + str([activity for activity in activities])
            }
        }
    }

def dispatch(intent_request):
    return getEpitechActivities()

def lambda_handler(event, context):
    os.environ['TZ'] = 'America/New_York'
    time.tzset()
    return dispatch(event)