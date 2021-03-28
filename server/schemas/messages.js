const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    messageID: {
        type: String,
        required: true
    },
    disappearingLink: {
        type: String,
        required: true
    },
    expiringTime : {
        type : Date,
        required: true 
    }
},
{
    timestamps: true
}
);

let Messages = mongoose.model('Messages', MessagesSchema);

module.exports = Messages;