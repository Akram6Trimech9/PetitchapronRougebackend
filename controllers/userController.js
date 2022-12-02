const bcrypt=require("bcrypt");
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const usermodel=require('../models/user');
exports.getuser=async(req,res)=>{
    try{
      const users=await usermodel.findOne({id:req.params})
    users && users.length>0 && res.status(200).json(users)
    users && users.length==0 && res.status(404).json({message:'admin not found'})   
    }catch(err){
        return res.status(500).json(err)
    }
}
exports.getall=async(req,res)=>{
    try{ 
       const users= await usermodel.find({})
       users && users.length >0 && res.status(200).json({users})
       !users && res.status(404).json({message:" there is no users"})  
    }catch(err){
        return res.status(500).json(err)
    }
}
exports.signup= async (req,res)=>{
 try{
  const user=await usermodel.findOne({$and:[{email:req.body.email},{cin:req.body.cin}]})
    user &&  user.length>0 &&  res.status(401).json({message:'email exist try another one'})
    !user && bcrypt.hash(req.body.mdp,10,(err,encrypted)=>{
         if(err){
             return new Error("crypting Error")
         }
         if(encrypted){
             const user=new usermodel({
                 _id:new mongoose.Types.ObjectId(),
                 nom:req.body.nom,
                 prenom:req.body.prenom,
                 mdp:encrypted,
                  numtel:req.body.numtel,
                 cin:req.body.cin,
                  email: req.body.email,
                 })
             user.save()
             .then(user=>{
                 if(user){
                     return res.status(201).json({message:'user created',user})
                 }else{
                     return res.status(401).json({message:'something went wrong'})
                 }
             })
             .catch(err=>{{
                    return res.status(500).json(err);
             }})
         }
    })
 }catch(err){
    return res.status(500).json(err) ; 
 }
}

exports.login=async (req,res)=>{
 try{
        const user= await usermodel.findOne({email:req.body.email})
         if(user){
             bcrypt.compare(req.body.mdp,user.mdp,(err,same)=>{
                 if(err){
                     return new Error("comparing failed");
                 }
                 if(same){
                     let nom=user.nom ; 
                     let role=user.role ; 
                     const token=jwt.sign({user_id:user._id,role:user.role,nom:user.nom},"secrets",{ expiresIn: 60 * 60 * 60 })
                    
                     return res.status(200).json({message:'login Succesfully',token,nom,role})
                 }else { 
                     return res.status(401).json({message:'mdp incorrect'});
                 }
             })
         } 
 } catch(err){
 return res.status(500).json(err)
 }
}
