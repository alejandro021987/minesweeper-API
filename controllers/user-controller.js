const UserModel = require('../models/UserModel');

const updateUser = (userId, data) => {
  UserModel.updateMany({_id : userId},{$set : data}).exec()
    .then(()=>{
        return data
    }).catch(err =>{
        return {message : err}
    })
}

module.exports = {
  updateUser
}