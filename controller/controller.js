const Contact = require('../schemas/Contact')

exports.createContact=(req,res)=>{
    const {name,email,phone}= req.body 
    const contact = new Contact({
        name,
        email,
        phone
    })
    contact.save()
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
      //  console.log(err)
       res.json({
           message:'error in creating contact'
       })
    })
}
exports.getAllContact=(req,res)=>{
  Contact.find()
  .then(contacts =>{
      res.render('index',{contacts})
  })
  .catch(err =>{
      console.log(err)
      res.json({
          message:'error in getting all contact'
      })
  })
}
exports.getContactById=(req,res)=>{
    let {id} =req.params
    Contact.findById(id)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.json({
            message:'error in getting single data'
        })
    })
}
exports.updateDAta=(req,res)=>{
    let {
        name,email,phone
    } =req.body 

    let {id}= req.params
    Contact.findByIdAndUpdate({
    _id:id},
    {
        $set:{
            name,email,phone
        }
    },{
        new:true
    })
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.json({
            message:'error in updating data'
        })
    })
}
exports.deletingData =(req,res)=>{
    const {id} = req.params 
    Contact.findOneAndDelete(id)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.json({
            message:'error in deleting data'
        })
    }
        )
}