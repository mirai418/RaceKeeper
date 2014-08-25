#
# Request receiving server for Racekeeper.
# Writes all data to files.
#

from flask import Flask, redirect, request
import requests, json, logging

app = Flask(__name__)

TEST = True
CLIENT_ID = "609fbfd328a84f4e9773adfb8cf9f824"
CLIENT_SECRET = "cf21c82d44d741a5ab42356f0a8e4326"
AUTH_URI = "https://runkeeper.com/apps/authorize"
TOKEN_URI = "https://runkeeper.com/apps/token"
HOST_URL = "http://api.runkeeper.com"
OAUTH_FILE = 'oauth_tokens.txt'
RACE_TO_MEMBER_FILE = 'race_to_member.txt' # Stores association between races and members
RACES_FILE = 'races.txt' # Stores data about races
RACES_CNT_FILE = 'races_count.txt' # Counter for current number of races
RUNS_DIR = 'runs/'
LOG_FILE = '../log/backend.log'

if TEST:
    ACCESS_TOKEN = open('sample_oauth').read()
else:
    ACCESS_TOKEN = None

@app.route("/")
def hello():
    return "Hello World\n"

@app.route("/raceKeeperAuth")
def raceKeeperAuth():
    try:
        redirect_uri = "http://54.82.47.81:8080/getToken"
        global CLIENT_ID
        global AUTH_URI
        url = "%s?client_id=%s&response_type=code&redirect_uri=%s" % (AUTH_URI, CLIENT_ID, redirect_uri)
        return redirect(url, code=302)
    except Exception as e:
        print e
        return "NAY\n" + str(e)

@app.route("/addMemberToRaceGroup/", methods=['POST'])
def addMemberToRaceGroup():
    try:
        if request.method == 'POST':
            request_data = json.loads(request.data)
            member_id = request_data['member_id']
            race_id = request_data['race_id']
            datum = "%s:%s\n" % (race_id, member_id)
            race_to_member_file = open(RACE_TO_MEMBER_FILE, 'a')
            race_to_member_file.write(datum)
            race_to_member_file.close()
            return "Added member %s to race %s" % (member_id, race_id)
        else:
            return "Must send POST\n"
    except Exception as e:
        return str(e)
        
@app.route("/addRaceGroup/", methods=['POST'])
def addRaceGroup():
    try:
        if request.method == 'POST':
            request_data = json.loads(request.data)
            print request_data
            start_date = request_data['start_date']
            end_date = request_data['end_date']
            activity_type = request_data['activity_type']
            race_name = request_data['race_name']
            race_id = getAndUpdateRaceId()
            saveRaceToFile(str(race_id), race_name, start_date, end_date, activity_type)
            return str(race_id)
        else:
            return "Must send POST\n"
    except Exception as e:
        return str(e)

@app.route("/getToken")
def getToken():
    try:
        code = request.args.get('code', '')
        global TOKEN_URI
        global CLIENT_ID
        global CLIENT_SECREiT
        global ACCESS_TOKEN
        redirect_uri = "http://54.82.47.81:8080/getToken"
        url = "%s?grant_type=authorization_code&code=%s&client_id=%s&client_secret=%s&redirect_uri=%s" % (TOKEN_URI, code, CLIENT_ID, CLIENT_SECRET, redirect_uri)
        hdrs = {'Content-Type': 'application/x-www-form-urlencoded'}
        resp = requests.post(url, headers=hdrs)
        resp_dict = resp.json()
        print resp_dict
        ACCESS_TOKEN = resp_dict['access_token']
        f = open(OAUTH_FILE, 'w')
        f.write(ACCESS_TOKEN)
        f.close()
        return "Done " + resp.text
    except Exception as e:
        return str(e)

@app.route("/races/")
def getAllRaces():
    try:
        race = findRaceFromFile()
        if race is None:
            return "No race found.\n"
        else:
            return json.dumps(race)
    except Exception as e:
        return str(e)

@app.route("/races/<race_id>")
def getSpecificRace(race_id):
    try:
        race = findRaceFromFile(race_id)
        print race
        if race is None:
            return "No race found.\n"
        else:
            return json.dumps(race)
    except Exception as e:
        return str(e)

@app.route("/runs/<race_id>")
def getRunsForRace(race_id):
    try:
        race = findRaceFromFile(race_id)
        print race
        start_date = race['start_date']
        end_date = race['end_date']
        activity_type = race['activity_type']
        if race is None:
            return "Race not found."
        members = getMembersOfRace(race_id)
        print members
        result = dict()
        for member in members:
            result[member] = getActivities(member, start_date, end_date, activity_type)
        print result
        return json.dumps(result)
    except Excepion as e:
        return str(e)

def getActivities(access_token, start_date, end_date, activity_type):
    global HOST_URL
    url = "%s/fitnessActivities?access_token=%s&pageSize=100&noEarlierThan=%s&noLaterThan=%s" % (HOST_URL, access_token, start_date, end_date)
    response = requests.get(url)
    activities = response.json()['items']
    result = list()
    for activity in activities:
        if activity['type'] == activity_type:
            result.append(activity)
    return result

# Helper methods

def getMembersOfRace(race_id):
    result = list()
    race_to_member_file = open(RACE_TO_MEMBER_FILE, 'r')
    for line in race_to_member_file:
        line_arr = line.split(':')
        if line_arr[0] == race_id:
            result.append(line_arr[1].rstrip('\n'))
    race_to_member_file.close()
    return result

def getAndUpdateRaceId():
    races_cnt_file = open(RACES_CNT_FILE, 'r+')
    race_cnt = races_cnt_file.read()
    if race_cnt is None or len(race_cnt) == 0:
        race_id = 1
    else:
        race_id = int(race_cnt)
        race_id += 1
    race_cnt = str(race_id)
    races_cnt_file.seek(0, 0)
    races_cnt_file.write(race_cnt)
    races_cnt_file.close()
    return race_id

def saveRaceToFile(race_id, race_name, start_date, end_date, activity_type):
    races_file = open(RACES_FILE, 'a')
    datum = "%s:%s,%s,%s,%s\n" % (race_id, race_name, start_date, end_date, activity_type)
    races_file.write(datum)
    races_file.close()

def findRaceFromFile(race_id=None):
    races_file = open(RACES_FILE, 'r')
    if race_id is not None:
        for line in races_file:
            line_arr = line.split(':')
            if line_arr[0] == race_id:
                result = dict()
                result['race_id'] = line_arr[0]
                attributes = line_arr[1]
                attributes_arr = attributes.split(',')
                result['race_name'] = attributes_arr[0]
                result['start_date'] = attributes_arr[1]
                result['end_date'] = attributes_arr[2]
                result['activity_type'] = attributes_arr[3].rstrip('\n')
                races_file.close()
                return result
    else:
        result = dict()
        races = list()
        for line in races_file:
            race = dict()
            line_arr = line.split(':')
            race['race_id'] = line_arr[0]
            attributes = line_arr[1]
            attributes_arr = attributes.split(',')
            race['race_name'] = attributes_arr[0]
            race['start_date'] = attributes_arr[1]
            race['end_date'] = attributes_arr[2]
            race['activity_type'] = attributes_arr[3].rstrip('\n')
            races.append(race)
        result['races'] = races
        races_file.close()
        return result

    races_file.close()
    return None

class OAuth():
    CLIENT_ID = None
    CLIENT_SECRET = None
    REDIRECT_URI = None

    def __init__(client_id, client_secret, redirect_uri):
        self.CLIENT_ID = client_id
        self.CLIENT_SECRET = client_secret
        self.REDIRECT_URI = redirect_uri
    

if __name__ == "__main__":
    # If RESET is set, then delete and create:
    # - races_count.txt
    # - races.txt
    werkzeug_logger = logging.getLogger('werkzeug')
    log_file = logging.FileHandler(LOG_FILE)
    log_file.setLevel(logging.DEBUG)
    werkzeug_logger.addHandler(log_file)
    app.logger.addHandler(log_file)
    app.run("0.0.0.0", port=8080)
