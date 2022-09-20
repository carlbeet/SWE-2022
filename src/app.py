#!/bin/python3

from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient


with open('creds.config') as fin:
	# this is a place to safely load db configs
	contents = fin.readlines()
	mongo_username = contents[0].rstrip()
	mongo_password = contents[1].rstrip()

'''
Connect with the MongoDB Databse
'''
client = MongoClient(f'mongodb+srv://{mongo_username}:{mongo_password}@cluster0.hvzidrr.mongodb.net/?retryWrites=true&w=majority')

db = client.test



app = Flask(__name__)
CORS(app)



if __name__ == "__main__":
	try:
		app.run()
	except KeyboardInterrupt:
		pass



