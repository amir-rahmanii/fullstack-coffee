import { hash , compare } from "bcryptjs"
import jwt from "jsonwebtoken"

type generateTokenProps = {
    email: string
}


const hashPassword = async (password: string) => {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
}


const comparePassword = async (password: string, hash: string) => {
    try {
        const isValid = await compare(password, hash);
        return isValid; 
    } catch (err) {
        return false
    }
}


const generateToken = async (data: generateTokenProps) => {
    const secret = process.env.PRIVATE_KEY;
    if (!secret) throw new Error("Missing PRIVATE_KEY environment variable");

    const token = jwt.sign({ ...data }, secret, { expiresIn: '24h' });
    return token;
}


const verifyToken = (token: string): generateTokenProps | false => {
    const secret = process.env.PRIVATE_KEY;
    if (!secret) throw new Error("Missing PRIVATE_KEY environment variable");

    try {
        const validationToken = jwt.verify(token, secret);
        return typeof validationToken === "object" ? validationToken as generateTokenProps : false;
    } catch (error) {
        return false;
    }
};




export {verifyToken , hashPassword, generateToken , comparePassword } 
