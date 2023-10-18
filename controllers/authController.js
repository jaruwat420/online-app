import {response} from "express";
import { pool } from "../db.js";
import bcrypt from 'bcrypt';


export const getRegister = async (req, res) => {
    res.render('auth/register');
}

// Register
export const register = async (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;

    try {
         // Check if the email already exists
        const [existingUser] = await pool.query("SELECT user_email FROM users WHERE user_email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "มีอีเมลผู้ใช้นี้ในระบบแล้ว!", status: "400" });
        }

        // Hash the password
        const saltRounds = 10;
        const password = await bcrypt.hash(req.body.password, saltRounds);
        const passwordConfirm = await bcrypt.hash(req.body.password, saltRounds);

        // Insert the new user
        await pool.query("INSERT INTO users (user_firstname, user_lastname, user_email, user_password, user_password1) VALUES (?, ?, ?, ?, ?)", [firstName, lastName, email, password, passwordConfirm]);
        return res.status(200).json({ message: "ลงทะเบียนสำเร็จ!", status: "200" });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: "Internal Server Error!", status: "500" });
    }
};

// Login
export const login = async (req, res) => {
    const {username, password}= req.body
    
    try {
        const [results] = await pool.query("SELECT user_email, user_password FROM users WHERE user_email = ?", [username]);

        if (results.length === 0 ) {
            return res.status(401).send({message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!",status: "401"});
        }

        const isPasswordMatch = bcrypt.compare(password, results[0].user_password);

        if (isPasswordMatch) {                
            return res.status(200).send({message: "Login Success Fully.!",status: "200"});
        } else {
            return res.send(400).send({message: "Login Failed...!",status: "400"});
        }        

    } catch (error) {
        console.log(`error der ja ${error}.`);   
    }    
};

export const secretPage = async (req, res) => {
    res.render('secret');
}