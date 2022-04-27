import UserModal from "../models/users.js";
import mongoose from 'mongoose';
// import Category from '../models/categories.js' 
// import SubCategory from '../models/subCategory.js' 
// import Product from '../models/product.js' 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = 'test';
import { encrypt, decrypt } from '../middleware/cypto.js';
import {sendmail} from '../middleware/email.js';





export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    // const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    // if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const hashedPassword = encrypt(password);
    if(hashedPassword != oldUser.password){
      res.status(400).json({ message: "Invalid credentials" });
    }
    const Password = decrypt(hashedPassword);

    oldUser.lastActive= Date.now();

     await oldUser.save();


    const token = jwt.sign({ email: oldUser.email, id: oldUser._id, name: oldUser.name }, secret, { expiresIn: "6h" });
    return res.status(200).json({ result: oldUser, password: Password, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};






export const signup = async (req, res) => {
  const { name, email, password, isSuperAdmin, position} = req.body;
//   const profileImage = req.files;
    console.log({ name, email, password, isSuperAdmin, position});

  try {
    const oldUser = await UserModal.findOne( {email} );
    if (oldUser) return res.status(400).json({ message: "User already exists" });

      // const hashedPassword = await bcrypt.hash(password, 12);
      const hashedPassword = encrypt(password);

      const modelData = new UserModal({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        password: hashedPassword,
        isSuperAdmin: isSuperAdmin,
        position: position,
        // profileImage: profileImage,
    });

    const result = await modelData.save();
    console.log(result);

    const Password = decrypt(hashedPassword);

    sendmail(email, Password)

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "6h" } );
    return res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};






export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await UserModal.findById(id);

  if (user){
    const {name, email, password, isSuperAdmin, position} = req.body;
    // const profileImage = req.files;

    const hashedPassword = encrypt(password);

      user.name= name || user.name;
      user.email= email || user.email;
      user.password= hashedPassword || user.password;
      user.isSuperAdmin= isSuperAdmin || user.isSuperAdmin;
      user.position= position || user.position;
    //   user.profileImage= profileImage || user.profileImage;

    const updateUser = await user.save();

    res.status(201).json(updateUser);

  }else{
    res.status(404).send({message: 'user cannot update'});
  }
}




export const getAllUsers = async(req,res) => {
  const users = await UserModal.find();
  res.status(200).json(users)
}


export const getuser = async(req,res) => {
    const id = req.params.id;
    const users = await UserModal.findById(id);
    res.status(200).json(users)
  }



export const updatePassword = async (req, res) => {
  const id = req.params.id;
  const user = await UserModal.findById(id);

  try{
    if (user){
      const {password} = req.body;
      
      console.log(password);

      const hashedPassword = encrypt(password);


      user.password = hashedPassword || user.password;

      const updateuser = await user.save();

      const decryptPassword = decrypt(hashedPassword);
      sendmail(user.email, decryptPassword)

      res.status(201).json(updateuser);
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
  
  
  export const getDashboardInfo = async (req, res) => {
    try {
        const products = await (await Product.find()).length
        const categories = await (await Category.find()).length
        const subCategories = await (await SubCategory.find()).length
        res.status(200).json({products, categories, subCategories})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
  }




  export const deleteUser = async(req,res) => {
    const product = await UserModal.findByIdAndDelete(req.params.id)
    if(product){
        res.send({message: 'Deleted successfully'});
    }else{
        res.status(404).send({message: 'user not found'});
    }
}


