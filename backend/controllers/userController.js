import { generateToken, deleteToken, getTokenData } from "../utils/jwtToken.js";
import User from "../models/userDb.js";
import Password from "../models/passwordDb.js";

export const userController = {
    signup: async (req,res) => {
       try {
        const { email, password , name} = req.body
        const userExists = await User.findOne({email: email})
        if (userExists) {
            res.status(401).send({message: "User already exixts"})
        } else {
            const newUser = {
                email,
                password,
                name
            }
            const user = new User(newUser)
            await user.save()
            res.status(200).send({message: "Account created"})
        }
       } catch (error) {
           res.status(500).send({error: "Internal server error"})
           console.log(error.message);
       } 
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({email: email});
            if (user && (await user.matchPassword(password))) {
                let token = await generateToken(res, user._id);
                res.status(200).json({
                    token
                });
            } else {
                res.status(401).send({ error: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).send({error: "Internal server error"})
            console.log(error.message);
        }
    },
    logout: async (req, res) => {
        try {
            deleteToken(res)
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            res.status(500).send({error: "Internal server error"})
            console.log(error.message);
        }
    },
    savePassword: async (req,res) => {
        try {
            const {name, password} = req.body
            if (name && password) {
                const userId = getTokenData(req)
                const newPassword = new Password({name,password,creatorId: userId})
                const savedPassword = await newPassword.save()
                res.status(200).send(savedPassword)
            } else {
                res.status(401).send({ error: "Invalid input" });
            }
        } catch (error) {
            res.status(500).send({error: "Internal server error"})
            console.log(error.message);
        }
    },
    getPasswords: async (req,res) => {
        try {
            const userId = getTokenData(req)
            const userPasswords = await Password.find({creatorId: userId})
            res.status(200).send(userPasswords);
        } catch (error) {
            res.status(500).send({error: "Internal server error"})
            console.log(error.message);
        }
    },
    deletePassword: async (req,res) =>{
        try {
            const userId = await getTokenData(req) 
            const passwordId = req.query.id;
            const passwordData = await Password.findById(passwordId);
            if (passwordData.creatorId == userId) {
                await Password.findByIdAndDelete(passwordId)
                res.status(200).send({message: "Password deleted"});
            } else {
                res.status(401).send({message: "Wrong user"});
            } 
        } catch (error) {
            res.status(500).send({error: "Internal server error"})
            console.log(error.message);
        }
    },
    editPassword: async (req,res) => {
        try {
            const userId = getTokenData(req)
            const {name, password, passwordId} = req.body;
            const passwordData = await Password.findById(passwordId);
            if (passwordData.creatorId == userId) {
                const updatedData = await Password.findByIdAndUpdate(passwordId,{name,password})
                res.status(200).send(updatedData);
            } else {
                res.status(401).send({message: "Wrong user"});
            } 
        } catch (error) {
            res.status(500).send({error: "Internal server error"})
            console.log(error.message);
        }
    }
} 