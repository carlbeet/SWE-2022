# Anonymous Messaging Web Application

:sparkles: Welcome to our project! :sparkles:

## Features

- Anonymous Posting
- Anonymous Personal Messaging
- Random Username Generation


- Cross-platform (Linux, MacOS, BSDs, Windows)

## Setup

In `src/creds.config`, enter information in the following format:

```
mongo_db_username
mongo_db_password
password_salt
```

In `client/comments/.env`, enter information in the following formati:

```
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
REACT_APP_FIREBASE_APP_ID=""
REACT_APP_FIREBASE_MEASUREMENT_ID=""
```
## Installation

This method requires [Node js](https://nodejs.org/en/download/)

On Unix and Windows:

```bash
git clone https://github.com/Adamkadaban/SWE-2022
cd SWE-2022
cd ./src
python3 install -r requirements.txt

npm --prefix ./client/login install
npm --prefix ./client/comments install
npm --prefix ./client/messaging/client install
npm --prefix ./client/messaging/server install
npm --prefix ./client/about install
```

## Usage

```bash
cd ./src
python3 app.py
cd ../
cd ./client/login
./start.sh
cd ../comments
./start.sh
cd ../messaging/server
./start.sh
cd ../client
./start.sh
cd ../../about
./start.sh
```

## Needs Work
Installing data into graphical visualization from MongoDB
Pull data with Ajax in JSON form for interpretation
Utilize D3.js to graph data for comparative reasons

## Contributing

See [contributing](contribute.md) for guidelines.
