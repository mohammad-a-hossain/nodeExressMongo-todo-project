const {Schema,model} =require('mongoose')

const contactSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:20,
        minLength:10
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        maxLength:14,
        minLength:9
    }
})
const Contact = model('Contact',contactSchema)
module.exports = Contact