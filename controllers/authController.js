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
    const { fullName, email, password, passwordConfirm } = req.body;

    try {
        // Check if the email is already in use
        const existingUser = await pool.query("SELECT user_email FROM tbl_user WHERE user_email = ?", [email]);
        console.log(existingUser);
        if (existingUser.length > 0) {
            return res.render('register', {
                message: "That email is already in use!"
            });
        }

        if (password !== passwordConfirm) {
            return res.render('register', {
                message: "Password does not match the confirmation!"
            });
        }

        await pool.query("INSERT INTO tbl_user (user_name, user_email, user_password, user_password1) VALUES (?, ?, ?, ?)", [fullName, email, password, passwordConfirm]);
            return res.render('register', {
                message: "Success Fully.!"
            });
    } catch (error) {
        console.error('Error during registration:', error);
            res.status(500).send('Internal Server Error');
    }
};

export const getLogin = async (req, res) => {
    res.render('auth/login');
}

export const login = async (req, res) => {
    console.log(req.body);
}