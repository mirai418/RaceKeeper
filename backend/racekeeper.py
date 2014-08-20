#
# Request receiving server for Racekeeper.
# Writes all data to files.
#

from flask import Flask, redirect, request
import requests, json

app = Flask(__name__)

CLIENT_ID = "609fbfd328a84f4e9773adfb8cf9f824"
CLIENT_SECRET = "cf21c82d44d741a5ab42356f0a8e4326"
AUTH_URI = "https://runkeeper.com/apps/authorize"
TOKEN_URI = "https://runkeeper.com/apps/token"
OAUTH_FILE = 'oauth_tokens.txt'
RACES_FILE = 'races.txt'
RUNS_FILE = 'runs.txt'
RACES_CNT_FILE = 'races_count.txt'
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
            races_file = open(RACES_FILE, 'a')
            races_file.write(datum)
            races_file.close()
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

            races_cnt_file = open(RACES_CNT_FILE, 'r+')
            race_cnt = races_cnt_file.read()
            print race_cnt
            if race_cnt is None or len(race_cnt) == 0:
                race_id = 1
            else:
                race_id = int(race_cnt) + 1
            print race_id
            races_cnt_file.write(race_id)
            races_cnt_file.close()

            return race_id
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
    if ACCESS_TOKEN is None:
        f = open(OAUTH_FILE, 'r')
        ACCESS_TOKEN = f.readline()
    return "Placeholder"

@app.route("/races/<int:race_id>")
def getSpecificRace(race_id):
    return "Placeholder"

@app.route("/runs/<int:race_id>")
def getRunsForRace(race_id):
    return "Placeholder"

class OAuth():
    CLIENT_ID = None
    CLIENT_SECRET = None
    REDIRECT_URI = None

    def __init__(client_id, client_secret, redirect_uri):
        self.CLIENT_ID = client_id
        self.CLIENT_SECRET = client_secret
        self.REDIRECT_URI = redirect_uri
    

if __name__ == "__main__":
    app.run("0.0.0.0", port=8080)
