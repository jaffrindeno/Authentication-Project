import md5 from "md5";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const registerUser = async(req, res, next) => {
    try{
        const {fullName, email, password, mobileNumber} = req.body;

        

        if(!fullName || !email || !password || !mobileNumber) {
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await User.findOne({$or: [{email: email}, {mobileNumber: mobileNumber}]});

        if(existingUser) return res.status(409).json({message: "User already exists"});

        const hashed_password = md5(password);

        const user = new User({
            fullName: fullName.trim(),
            email,
            password: hashed_password,
            mobileNumber
        });

        await user.save();
        
        res.status(201).json({success: true, message: "User registered successfully"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getAllUsers = async(req, res, next) => {
    try{
        const userId = req.user.id;

        const users = await User.find({_id: {$ne: userId}});

        res.status(200).json(users);
    } catch(error){
        next(error);
    }
}

export const loginUser = async(req, res, next) => {
    const {email, mobileNumber, password} = req.body;
    

    try{
        const user = await User.findOne({$or: [{email: email}, {mobileNumber: mobileNumber}]});

        if(!user) return res.json({message: "User not registered"});

        const correctPassword = (md5(password) === user.password);

        if(!correctPassword) return res.json({message: "Invalid Password"});

        const token = jwt.sign({id: user._id, email: user.email}, SECRET_KEY, {expiresIn: "24h"})

        res.status(200).json({token,user});
    } catch(error) {
        next(error);
    }
}  

export const deleteUser = async(req, res, next) => {
    try{
        const {id} = req.params;

        await User.findByIdAndDelete(id);

        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        next(error);
    }
}

export const homeControl = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        if(!user) {
            return res.json({message: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}