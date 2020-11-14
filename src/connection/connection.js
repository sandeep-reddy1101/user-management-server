const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

let schema = {
    userName : {
        type : String
    },
    userID : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    mail : {
        type : String,
        required : true
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
}

const userSchema = mongoose.Schema(schema, {collection : "userDB", timestamps : {createdAt : true, updatedAt : true}});

collections = {};

collections.getCollection = ()=>{
    return mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser : true}).then((db)=>{
        return db.model('userDB', userSchema)
    }).catch((error)=>{
        console.log("Not able to connect to database")
        return error.message
    })
}

module.exports = collections;


