#!/bin/python3

from flask import Flask, request
from flask_cors import CORS
import pyaes, pbkdf2, binascii, os, secrets
from datetime import datetime
import pymongo
from bson.objectid import ObjectId

with open('creds.config') as fin:
	# this is a place to safely load db configs
	contents = fin.readlines()
	mongo_username = contents[0].rstrip()
	mongo_password = contents[1].rstrip()
	mongo_salt = contents[2].rstrip()

adjectives = ["Soft", "Hard", "Cramped", "Free", "Glassy", "Hot", "Cold", "Sweaty", "Dry", "Wet"]
nouns = ["Cucumber", "Banana", "Cat", "Dog", "Engineer", "Scientist", "Car", "User", "Meat", "Mattress"]
verbs = ["Run", "Sweat", "Cry", "Bleed", "Lift", "Drip", "Push", "Pull", "Drop", "Use"]
def returnUniqueAnonymizedUID(uid):
    uid = uid.zfill(3)
    return adjectives[(int)(uid[0])] + nouns[(int)(uid[1])] + verbs[(int)(uid[2])]

passwordSalt = mongo_salt # pls don't steal :)

key = pbkdf2.PBKDF2(mongo_password, passwordSalt).read(32)

def encrypt(password_plaintext):
    iv = secrets.randbits(32)
    aes_password = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
    password_ciphertext = aes_password.encrypt(password_plaintext)
    return (binascii.hexlify(password_ciphertext), iv)

def decrypt(password_ciphertext, iv):
    aes_password = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
    password_decrypted = aes_password.decrypt(binascii.unhexlify(password_ciphertext))
    return password_decrypted

myclient = pymongo.MongoClient(f'mongodb+srv://{mongo_username}:{mongo_password}@cluster0.hvzidrr.mongodb.net/?retryWrites=true&w=majority')
mydb = myclient["amwa"]
mycol = mydb["user"]
mycolp = mydb["post"]

def findPost(post, subpost, tags, email):
    aid = findAID(email)
    if(aid != None):
        myquery = {"title": post, "message": subpost, "tags": tags, "aid": aid}
        mydoc = mycolp.find(myquery).limit(1)
        for x in mydoc:
            return x
        return -1
    return 2

def findAllPosts(text):
    myquery = {}
    mydoc = mycolp.find(myquery)
    posts = []
    for x in mydoc:
        if (text in x["title"] or text in x["message"] or text in x["tags"]):
            posts.append(x)
    return posts

def insertIntoPosts(post, subpost, tags, email):
    pst = findPost(post, subpost, tags, email)
    if(pst == -1):
        time = datetime.now()
        mydict = {"title": post, "message": subpost, "tags": tags, "aid": findAID(email), "upvote": 0, "downvote": 0, "time": time}
        x = mycolp.insert_one(mydict)
        print("Post made at", time)
    elif pst == 2:
        print("User doesn't exist")
    else:
        print("Post already exists")

def vote(post, subpost, tags, email, posneg, remadd):
    pst = findPost(post, subpost, tags, email)
    if(pst != -1):
        myquery = {"title": post, "message": subpost, "tags": tags, "aid": findAID(email)}
        if(posneg == 1):
            newvalues = {"$set": {"upvote": pst["upvote"] + remadd}}
            mycolp.update_one(myquery, newvalues)
        elif(posneg == -1):
            newvalues = {"$set": {"downvote": pst["downvote"] + remadd}}
            mycolp.update_one(myquery, newvalues)
        print("Post was updated,", "upvote" if posneg == 1 else "downvote", "was", "added" if remadd == 1 else "removed")
    else:
        print("Post doesn't exist")

def insertIntoUsers(email_i, password_i):
    if(findUser(email_i) == -1):
        (password_ciphertext, iv) = encrypt(password_i)
        mydict = { "email": email_i, "password": password_ciphertext, "iv": iv}
        x = mycol.insert_one(mydict)
        a_id = returnUniqueAnonymizedUID(str(int(str(x.inserted_id)[21:], base = 16)))
        print(a_id, "inserted!")
    else:
        print("User already established")

def getMostRecentPosts(n):
    myquery = {}
    mydoc = mycolp.find(myquery).sort("time", -1).limit(n)
    for x in mydoc:
        print(x)

def findAID(email_i):
    if(findUser(email_i) != -1):
        myquery = {"email": email_i}
        mydoc = mycol.find(myquery).limit(1)
        for x in mydoc:
            return(returnUniqueAnonymizedUID(str(int(str(x["_id"])[21:], base = 16))))

def findUser(email_i):
    myquery = {"email": email_i}
    mydoc = mycol.find(myquery).limit(1)
    for x in mydoc:
        return x
    return -1

def findPassword(email_i):
    if(findUser(email_i) != -1):
        myquery = {"email": email_i}
        mydoc = mycol.find(myquery)
        for x in mydoc:
            return decrypt(x["password"], x["iv"])

def isPasswordCorrect(email_i, password_i):
    return "Passwords match" if password_i.encode('ascii') == findPassword(email_i) else "Passwords do not match"

'''
example uses
insertIntoUsers("groupthirty@gmail.com", "123swe123")
insertIntoUsers("groupthirty@gmail.com", "123swe123")
print(isPasswordCorrect("groupthirty@gmail.com", "123swe123"))
print(isPasswordCorrect("groupthirty@gmail.com", "1234swe1234"))
print(findAID("groupthirty@gmail.com"))
print(findAID("grouppppthirty@gmail.com"))
insertIntoPosts("I love Colab", "They pay me so well", ["Google", "SWE", "Colab", "Money"], "groupthirty@gmail.com")
vote("I love Colab", "They pay me so well", ["Google", "SWE", "Colab", "Money"], "groupthirty@gmail.com", -1, -1)
getMostRecentPosts(1)
insertIntoPosts("I HATE Colab", "They pay me BAD", ["ANGRY"], "groupthirty@gmail.com")
getMostRecentPosts(1)
=======

adjectives = ["Soft", "Hard", "Cramped", "Free", "Glassy", "Hot", "Cold", "Sweaty", "Dry", "Wet"]
nouns = ["Cucumber", "Banana", "Cat", "Dog", "Engineer", "Scientist", "Car", "User", "Meat", "Mattress"]
verbs = ["Run", "Sweat", "Cry", "Bleed", "Lift", "Drip", "Push", "Pull", "Drop", "Use"]
def returnUniqueAnonymizedUID(uid):
    uid = uid.zfill(3)
    return adjectives[(int)(uid[0])] + nouns[(int)(uid[1])] + verbs[(int)(uid[2])]

passwordSalt = mongo_salt # pls don't steal :)

key = pbkdf2.PBKDF2(mongo_password, passwordSalt).read(32)

def encrypt(password_plaintext):
    iv = secrets.randbits(32)
    aes_password = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
    password_ciphertext = aes_password.encrypt(password_plaintext)
    return (binascii.hexlify(password_ciphertext), iv)

def decrypt(password_ciphertext, iv):
    aes_password = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
    password_decrypted = aes_password.decrypt(binascii.unhexlify(password_ciphertext))
    return password_decrypted

myclient = pymongo.MongoClient(f'mongodb+srv://{mongo_username}:{mongo_password}@cluster0.hvzidrr.mongodb.net/?retryWrites=true&w=majority')
mydb = myclient["amwa"]
mycol = mydb["user"]
mycolp = mydb["post"]

def findPost(post, subpost, tags, email):
    aid = findAID(email)
    if(aid != None):
        myquery = {"title": post, "message": subpost, "tags": tags, "aid": aid}
        mydoc = mycolp.find(myquery).limit(1)
        for x in mydoc:
            return x
        return -1
    return 2

def findAllPosts(text):
    myquery = {}
    mydoc = mycolp.find(myquery)
    posts = []
    for x in mydoc:
        if (text in x["title"] or text in x["message"] or text in x["tags"]):
            posts.append(x)
    return posts

def insertIntoPosts(post, subpost, tags, email):
    pst = findPost(post, subpost, tags, email)
    if(pst == -1):
        time = datetime.now()
        mydict = {"title": post, "message": subpost, "tags": tags, "aid": findAID(email), "upvote": 0, "downvote": 0, "time": time}
        x = mycolp.insert_one(mydict)
        print("Post made at", time)
    elif pst == 2:
        print("User doesn't exist")
    else:
        print("Post already exists")

def vote(post, subpost, tags, email, posneg, remadd):
    pst = findPost(post, subpost, tags, email)
    if(pst != -1):
        myquery = {"title": post, "message": subpost, "tags": tags, "aid": findAID(email)}
        if(posneg == 1):
            newvalues = {"$set": {"upvote": pst["upvote"] + remadd}}
            mycolp.update_one(myquery, newvalues)
        elif(posneg == -1):
            newvalues = {"$set": {"downvote": pst["downvote"] + remadd}}
            mycolp.update_one(myquery, newvalues)
        print("Post was updated,", "upvote" if posneg == 1 else "downvote", "was", "added" if remadd == 1 else "removed")
    else:
        print("Post doesn't exist")

def insertIntoUsers(email_i, password_i):
    if(findUser(email_i) == -1):
        (password_ciphertext, iv) = encrypt(password_i)
        mydict = { "email": email_i, "password": password_ciphertext, "iv": iv}
        x = mycol.insert_one(mydict)
        a_id = returnUniqueAnonymizedUID(str(int(str(x.inserted_id)[21:], base = 16)))
        print(a_id, "inserted!")
    else:
        print("User already established")

def getMostRecentPosts(n):
    myquery = {}
    mydoc = mycolp.find(myquery).sort("time", -1).limit(n)
    for x in mydoc:
        print(x)

def findAID(email_i):
    if(findUser(email_i) != -1):
        myquery = {"email": email_i}
        mydoc = mycol.find(myquery).limit(1)
        for x in mydoc:
            return(returnUniqueAnonymizedUID(str(int(str(x["_id"])[21:], base = 16))))

def findUser(email_i):
    myquery = {"email": email_i}
    mydoc = mycol.find(myquery).limit(1)
    for x in mydoc:
        return x
    return -1

def findPassword(email_i):
    if(findUser(email_i) != -1):
        myquery = {"email": email_i}
        mydoc = mycol.find(myquery)
        for x in mydoc:
            return decrypt(x["password"], x["iv"])

def isPasswordCorrect(email_i, password_i):
    return "Passwords match" if password_i.encode('ascii') == findPassword(email_i) else "Passwords do not match"

'''
example uses

insertIntoUsers("groupthirty@gmail.com", "123swe123")

insertIntoUsers("groupthirty@gmail.com", "123swe123")

print(isPasswordCorrect("groupthirty@gmail.com", "123swe123"))

print(isPasswordCorrect("groupthirty@gmail.com", "1234swe1234"))

print(findAID("groupthirty@gmail.com"))

print(findAID("grouppppthirty@gmail.com"))

insertIntoPosts("I love Colab", "They pay me so well", ["Google", "SWE", "Colab", "Money"], "groupthirty@gmail.com")

vote("I love Colab", "They pay me so well", ["Google", "SWE", "Colab", "Money"], "groupthirty@gmail.com", -1, -1)

getMostRecentPosts(1)

insertIntoPosts("I HATE Colab", "They pay me BAD", ["ANGRY"], "groupthirty@gmail.com")

getMostRecentPosts(1)

>>>>>>> fe8b508124701ff402b5399c1426ebdb5f80a184
findAllPosts("Google")
'''


app = Flask(__name__)
CORS(app)



if __name__ == "__main__":
	try:
		app.run()
	except KeyboardInterrupt:
		pass
