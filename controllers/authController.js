import {
    response
} from "express";
import {
    pool
} from "../db.js";

export const getRegister = async (req, res) => {

    res.render('auth/register');
}

export const register = async (req, res) => {
    //console.log(req.body);
    const {firstname, lastname, email, password, passwordConfirm } = req.body;
    
    try {
        const existingUser = await pool.query("SELECT user_email FROM users WHERE user_email = ?", [email]);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "มีอีเมลผู้ใช้นี้ในระบบแล้ว!" ,status: "400"});
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({ message: "รหัสผ่านไม่ตรงกัน!" ,status: "400"});
        }

        await pool.query("INSERT INTO users (user_firstname, user_lastname, user_email, user_password, 	user_password1) VALUES (?, ?, ?, ?, ?)", [firstname, lastname, email, password, passwordConfirm, ]);
            return res.sendStatus(200);

    } catch (error) {
        console.error('Error during registration:', error);
            return res.status(500).send('Internal Server Error');
    }
};

export const getLogin = async (req, res) => {
    // res.render('auth/login');
}

export const login = async (req, res) => {
    console.log(req.body);
    // const newUser = {username, password} = 
    // console.log(newUser);
}