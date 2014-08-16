import requests

class OAuth():
    CLIENT_ID = None
    CLIENT_SECRET = None
    REDIRECT_URI = None

    def __init__(client_id, client_secret, redirect_uri):
        self.CLIENT_ID = client_id
        self.CLIENT_SECRET = client_secret
        self.REDIRECT_URI = redirect_uri
    

