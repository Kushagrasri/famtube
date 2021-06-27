# Famtube

Famtube is an application to fetch youtube videos asynchronously and respond to endpoints which return the video data stored

## Installation

Install mongodb on your system and run - 

```bash
{path-to-mongod-file} --dbpath={path-to-data-storage}
C:/Users/Kush/mongodb/bin/mongod.exe --dbpath=C:/Users/Kush/mongodb-data
```

Install required packages after installing node on your system

```bash
npm i express@^4.17.1,
    google-auth-library@^7.1.2,
    googleapis@78.0.0,
    mongodb@3.6.9,
    mongoose@5.12.15,
    node-fetch@2.6.1,
    nodemon@2.0.7,
    request@2.88.2,
    validator@13.6.0
```

## Usage

To launch the server run the following command

```bash
npm run dev
```

## Endpoints

Host/Port - 127.0.0.1:3000
1. GET /video/:limit?
    returns a list of videos sorted in descending order of their publisted date with an optional parameter of limit which specifies the number of videos returned which is default to 3
2. POST /video
    request body - 
    {
        "title": "String",
        "description": "String"
    }
    returns a video searched on the basis of title and/or description
