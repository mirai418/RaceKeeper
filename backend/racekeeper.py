from flask import Flask, redirect, request
import requests, json

app = Flask(__name__)

CLIENT_ID = "609fbfd328a84f4e9773adfb8cf9f824"
CLIENT_SECRET = "cf21c82d44d741a5ab42356f0a8e4326"
AUTH_URI = "https://runkeeper.com/apps/authorize"
TOKEN_URI = "https://runkeeper.com/apps/token"
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
        return "Done " + resp.text
    except Exception as e:
        return str(e)

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
