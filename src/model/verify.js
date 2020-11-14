const connection = require('../connection/connection');

verify = {};

verify.findUserID = (custUserID)=>{
    return connection.getCollection().then((model)=>{
        return model.find({userID : custUserID}).then((user)=>{
            if(user.length > 0){
                return user
            }else{
                return null
            }
        })
    })
};

module.exports = verify;