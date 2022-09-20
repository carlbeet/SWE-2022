#!/bin/python3

from flask import Flask, request
from flask_cors import CORS


with open('creds.config') as fin:
	# this is a place to safely load db configs
	pass

app = Flask(__name__)
CORS(app)

if __name__ == "__main__":
	try:
		app.run()
	except KeyboardInterrupt:
		pass



