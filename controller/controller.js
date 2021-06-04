const Contact = require('../schemas/Contact')

exports.createContact=(req,res)=>{
    const {
        name,
        email,
        phone,
        id
    }= req.body 
   
    let error ={}
    if(!name){
        error.name ='name can not put empty'
    }
    if(!email){
        error.email ='email cant not put empty'
    }
    if(!phone){
        error.phone = 'phone cant put empty !'
    }
    
    let isError = Object.keys(error).length > 0

     if(isError){
         Contact.find()
         .then(contacts =>{
            return res.render('index',{contacts,error})
         })

         .catch(err =>{
          return res.json({
                message:'error in creating contact'
            })
         })
     }
   //update here
   if(id){
       Contact.findOneAndUpdate({
           _id:id
       },{
           $set:{
           name,
           email,
           phone
           
           }
       }).then(()=>{
           Contact.find()
           .then(contacts =>{
           res.render('index', {contacts,error:{}})
           })
           .catch(err =>{
               console.log(err)
            return res.json({
                message:'error in updating contact'
            })
           })
       })
   }else{

    const contact = new Contact({
        name,
        email,
        phone
    })
    contact.save()
    .then(contacts =>{
        Contact.find()
        .then(contacts =>{
        return res.render('index',{contacts,error:{}})
    })
       
    })
    .catch(err =>{
       console.log(err)
      return res.json({
           message:'error in creating contact'
       })
    })
}
}
exports.getAllContact=(req,res)=>{
  Contact.find()
  .then(contacts =>{
      res.render('index',{contacts,error:{}})
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
    Contact.findOneAndDelete({_id:id})
    .then(()=>{
        Contact.find()
        .then( contacts=>{
            //console.log(err)
             res.render('index',{contacts,error:{}})
        })
     
    })
    .catch(err =>{
        console.log(err)
      res.json({
            message:'error in deleting data'
        })
    })
}