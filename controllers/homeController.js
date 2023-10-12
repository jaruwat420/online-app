import {
    response
} from "express";
import {
    pool
} from "../db.js";

export const renderHome = async (req, res) => {
    res.render('home', {
        title: "homepage"
    });
}

export const renderRegister = async (req, res) => {

    res.render('register', {
        title: "HomePage"
    });
}

export const Register = async (req, res) => {

    res.render('register', {
        title: "HomePage"
    });
    const passwordHash = req.body.password;
    const confirmPassword = req.body.password;
    // console.log(md5.generate('passwordHash'));

    const userData = {
        user_name: req.body.fullname,
        user_email: req.body.email,
        user_password: req.body.password,
        user_password1: req.body.confirmPassword,
    }

    try {
        pool.query("INSERT INTO tbl_users SET ? ", [userData]);
        res.render("secret")
    } catch (error) {
        console.log(`insert Data Error ${error}.`);
    }
}

export const renderLogin = async (req, res) => {
    res.render("login");
}

export const Login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
}