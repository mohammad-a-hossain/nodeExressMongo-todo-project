const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const contactRoute =require('./routes/contactRout')



const app =express()
app.set('view engine','ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/contacts',contactRoute)

mongoose.connect('mongodb://localhost/projectTodo',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>{
    console.log('connection with DB success')
})
.catch(err =>{
    console.log(err)
})

app.get('*',(req,res)=>{
    res.json({
        message:"welcome to our project site "
    })
})

const PORT =process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log('app is running on port ',`${PORT}`)
})