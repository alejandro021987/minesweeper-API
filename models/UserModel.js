const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name : { type:String , required : true },
    email: { type:String , 
        required : true, 
        match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password : { type:String , required : true },
    created: { type: Date, default: Date.now },
    last_level:{ type: String, default: 0 },
    map_id:{ type: String, default: null },
    phone:String,
    
})

module.exports = mongoose.model('users', UserSchema);

