import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { isValidObjectId } from 'mongoose';
dotenv.config()

const key = process.env.JWT_SECRET_KEY

export const generateToken = async (res, data) => {
    let token;
    if (isValidObjectId(data)) {
        const userId = data
        token = jwt.sign({ userId }, `${key}`, { expiresIn: "30d" })
    }
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    return token
}

export const deleteToken = (res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        expires: new Date(0),
    });
}

export const getTokenData = (req) => {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, `${key}`);
    const userId = decoded.userId;
    return userId
}
