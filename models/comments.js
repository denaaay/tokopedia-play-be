const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    comment: {
        required: true,
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Comment", commentSchema);