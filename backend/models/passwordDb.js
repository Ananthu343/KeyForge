import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const  Password = mongoose.model("Passwords",PasswordSchema)
export default Password;