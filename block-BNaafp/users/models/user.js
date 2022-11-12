var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var userSchema = new mongoose.Schema({
    name :String,
    email:{type:String, required: true, unique: true},
    password:{type:String, required: true, minlength: 5},
})


userSchema.pre('save',async function(next){
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.verifyPassword = async function(password) {
    try {
        var result = await bcrypt.compare(password, this.password);
        return result
    } catch (error){
        return error
    }
}


module.exports = mongoose.model('User', userSchema);