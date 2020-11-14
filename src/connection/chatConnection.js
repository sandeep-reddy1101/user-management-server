const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

let chatschema = {
    userID : {
        type : String,
        required : true,
        unique : true
    },
    friends : [],
    chats : {
        friendUserID : [
            {
                message : String,
                time : {
                    type : Date,
                    default : new Date()
                }
            }
        ]
    }
};

const chatSchema = mongoose.Schema(chatschema, {collection : 'chatDB', timestamps : {createdAt : true, updatedAt : true}});

chatCollection = {};

chatCollection.getChatCollection = ()=>{
    return mongoose.connect('mongodb://localhost:27017/chatDB', { useNewUrlParser : true}).then((db)=>{
        return db.model('chatDB', chatschema)
    }).catch((error)=>{
        return error.message
    })
};
