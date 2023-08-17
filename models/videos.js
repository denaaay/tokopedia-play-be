const mongoose = require('mongoose');
const videosSchema = new mongoose.Schema({
    url_video: {
        required: true,
        type: String
    },
    url_thumbnail: {
        required: true,
        type: String,
    }
});

module.exports = mongoose.model("Video", videosSchema);