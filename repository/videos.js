const Videos = require('../models/videos');

const saveVideos = async (url_video, url_thumbnail) => {
    return new Promise ((resolve, reject) => {
        const videos = new Videos({
            url_video: url_video,
            url_thumbnail: url_thumbnail,
        });

        videos.save()
            .then(videoResult => {
                resolve(videoResult);
            })
            .catch(error => {
                reject(error);
            })
    });
}

const findVideos = async () => {
    return new Promise ((resolve, reject) => {
        Videos.find()
            .then(videoResult => {
                resolve(videoResult);
            })
            .catch(error => {
                reject(error);
            })
    });
}

const findByIdVideos = async (id) => {
    return new Promise ((resolve, reject) => {
        Videos.findById(id)
            .then(videoResult => {
                resolve(videoResult);
            })
            .catch(error => {
                reject(error);
            })
    });
}

module.exports = {
    saveVideos,
    findVideos,
    findByIdVideos,
}