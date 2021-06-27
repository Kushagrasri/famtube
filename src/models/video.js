const mongoose = require('mongoose')
const validator = require('validator')

const VideoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    channel: {
        name: String,
        id: String,
    },
    thumbnails: {
        default: {
            type: String,
            validate(value) {
                if(!validator.isURL(value)){
                    throw new Error('Not a valid url')
                }
            }
        },
        medium: {
            type: String,
            validate(value) {
                if(!validator.isURL(value)){
                    throw new Error('Not a valid url')
                }
            }
        },
        high: {
            type: String,
            validate(value) {
                if(!validator.isURL(value)){
                    throw new Error('Not a valid url')
                }
            }
        },
    },
    video_id: {
        type: String,
        required: true,
    },
    published: {
        type: Date,
        required: true,
    }
})

const Video = mongoose.model('Video', VideoSchema)

module.exports=Video