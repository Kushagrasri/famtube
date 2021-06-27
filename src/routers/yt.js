const express = require('express')
const Video = require('../models/video')
const request = require('request')
const router = new express.Router()

var pageToken = ""
var key_index = 0
var api_keys = ["AIzaSyBxc1kNNZ0fiEQUTvUtgcyniKWDOAgBNV4", "AIzaSyAiI5ci-TNhDhM79tuiQQABvHdm78NZCs4", "AIzaSyCPed0V7DAmWRW3BMlD2Z-Hwaqc58H2nuQ"]
async function store_data() {
    
    const query = "football"
    var params =  "part=snippet"+"&type=video"+"&key="+api_keys[key_index]+"&q="+query+"&pageToken="+pageToken+"&order=date&publishedAfter=2018-01-01T00:00:00.000Z"
    var url = "https://www.googleapis.com/youtube/v3/search?"+params

    
    try {
        request(url, (error, res, body) => {
            
            if (error) {
                console.log(error)
            }
        
            else if (!error && res.statusCode == 200) {
                body = JSON.parse(body)
                pageToken = body.nextPageToken
                const items = body.items
                for(let i=0; i<items.length;i++) {
                    var item=items[i]
                    data = {
                        "video_id": item.id.videoId,
                        "published": item.snippet.publishedAt,
                        "title": item.snippet.title,
                        "description": item.snippet.description,
                        "thumbnails": {
                            "default": item.snippet.thumbnails.default.url,
                            "medium": item.snippet.thumbnails.medium.url,
                            "high": item.snippet.thumbnails.high.url
                        },
                        "channel": {
                            "name": item.snippet.channelTitle,
                            "id": item.snippet.channelId
                        }
                    }
                    const video = new Video(data)
                    video.save()
                }
            }

            else{
                key_index = key_index + 1
                if(key_index == api_keys.length) {
                    console.log('Exhausted API keys!', undefined)
                    clearInterval(timer)
                    return
                } else {
                    return store_data()
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
    
}
timer = setInterval(store_data, 10000);


router.get('/:limit?', async (req, res) => {
    var limit = parseInt(req.params.limit)
    if(!limit)limit=3
    try {
        const videos = await Video.find({}).limit(limit)
        return res.status(200).send({videos})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/', async (req, res) => {
    try {
        video = await Video.findOne(req.body)
        return res.status(200).send({video})
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.post('/create', async (req, res) => {
    const video = new Video(req.body)
    try {
        await video.save()
        return res.status(201).send({video})
    } catch (e) {
        return res.status(400).send(e)
    }
})

module.exports = router