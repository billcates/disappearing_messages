const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    linkID: {
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

let Links = mongoose.model('Links', LinkSchema);

module.exports = Links;