const mongoose=require("mongoose");
const userModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId, 
    nom:{type:String ,required:true},
    mdp:{type:String,required:true},
    numtel:{type:String,required:true},
    cin:{type:String ,required:true},
    email: { type: String, required: true }
 
}, {
    versionKey: false
});
module.exports=mongoose.model('user',userModel)