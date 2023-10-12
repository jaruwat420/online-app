import { response } from "express";
import { pool } from "../db.js";

export const getRegister = async (req, res) => {
    res.render('register');
}

export const register = async (req, res) => {
    res.render('register', {
        title: "HomePage"
    });

    const newUser = {
        user_name: req.body.fullname,
        user_email: req.body.email,
        user_password: req.body.password,
        
    }

    try {
        await pool.query("INSERT INTO tbl_users SET ? ", [newUser]);
    } catch (error) {
        console.log(`insert Data Error ${error}.`);
    }
    
}

export const getLogin = async (req, res) => {
    res.render('login');
}

export const login = async (req, res) => {
    console.log(req.body);
}