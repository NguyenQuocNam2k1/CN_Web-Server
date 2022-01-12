import { UserModel } from "../models/UsersModel";


const checkRegister = async (req , res , next) => {
    const {userName , password , email} =  req.body;
    UserModel.find({$and: [{userName , password , email}]})
    .then(data => {
      if(data.length > 0){
        console.log("Success");
        return res.status(409).json({
          status:"409",
          message:"Account information already exists."
        })
      }else{
        next()
      }
    })
    .catch(err => {
        next()
    })
  }

module.export = checkRegister;