import {response} from "express";
import {pool} from "../db.js";
import bcrypt from 'bcrypt';
import Users from '../models/user.model.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import {json} from "sequelize";

import cookieParser from "cookie-parser";

dotenv.config({path: './.env'});

//----------------------------------Home----------------------------------//
export const getRegister = async (req, res) => {
    res.render('auth/register');
}

//----------------------------------Register----------------------------------//
export const register = async (req, res) => {
    const {firstname,lastname,email,password,passwordConfirm} = req.body;

    try {
        if (!(firstname && lastname && email && password && passwordConfirm)) {
            res.status(400).send("All input request!");
        }

        const oldUser = await Users.findOne({where: {user_email: email,}});

        if (oldUser) {
            return res.status(400).send("Use to  email exist");
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const passwordHashConfirm = await bcrypt.hash(passwordConfirm, saltRounds);
        const newUser = await Users.create({
            user_firstname: firstname,
            user_lastname: lastname,
            user_email: email,
            user_password: passwordHash,
            user_password1: passwordHashConfirm,
        })
        // Create Token
        const token = jwt.sign({user_id: newUser.user_id,email},
            process.env.TOKEN_KEY, {
                expiresIn: "1h"
            }
        )
        newUser.token = token;

        res.status(201).json({
            user_id: newUser.user_id,
            user_firstname: newUser.user_firstname,
            user_lastname: newUser.user_lastname,
            user_email: newUser.user_email,
            user_password: newUser.user_password,
            token: newUser.token,
        });

    } catch (error) {
        console.log(error);
    }
}

//----------------------------------Login----------------------------------//
export const login = async (req, res) => {
    try {
        const {username,password} = req.body;

        //validate
        if (!(username && password)) {
            res.status(400).json({
                message: 'Please Input Data In Field',
                status: 400
            })
            return;
        }
        const user = await Users.findOne({
            where: {
                user_email: username,
            }
        });
        if (user && (await bcrypt.compare(password, user.user_password))) {

            // create token
            const token = jwt.sign({
                    user_id: user.user_id,
                    username,
                },
                process.env.TOKEN_KEY, {
                    expiresIn: "1h"
                }
            )
            res.cookie('token', token, {
                maxAge: 3600000,
                httpOnly: true,
            });

            res.status(201).json({
                user_id: user.user_id,
                user_firstname: user.user_firstname,
                user_lastname: user.user_lastname,
                user_email: user.user_email,
                user_password: user.user_password,
                token: user.token,
            })
            return;
        }
        res.status(400).json("Invalid");
        res.status(400).send({
            message: 'Please Input Data In Field',
            status: 400
        })
        return;
    } catch (error) {
        res.status(400).json(`error :${error}`);
        return;
    }
}

//----------------------------------Render Login----------------------------------//
export const renderLogin = async (req, res) => {
    res.render('login');
}
//---------------------------------- Render Registration----------------------------------//
export const renderRegistration = async (req, res) => {
    res.render('register');
}

//----------------------------------Get Registration----------------------------------//
export const getRegistration = async (req, res) => {
    const {
        firstname,
        lastname, 
        email, 
        password, 
        passwordConfirm,
        telephone,
        address,
        district,
        county,
        province,
        postal_code
    } = req.body;

    const oldUser = await Users.findOne({where: {user_email:email }});
    if (oldUser) {
        return res.status(400).json({ error: 'พบผู้ใช้นี้ในระบบแล้วกรุณาเปลี่ยน' });
    }
    //const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
        user_firstname: firstname,
        user_lastname: lastname,
        user_email: email,
        user_password: passwordHash,
        user_password1: passwordHash,
        user_address: address,
        user_phone: telephone,
        user_district: district,
        user_county: county,
        user_city: province,
        user_postal_code: postal_code,
        user_role: 'customer'
    });
    // Create
    //  // Create Token
    const token = jwt.sign({
        user_id: newUser.user_id,email
    },
        process.env.TOKEN_KEY, {
            expiresIn: "1h"
        }
    )
    newUser.token = token;
    res.status(201).json({
        user_id: newUser.user_id,
        user_firstname: newUser.user_firstname,
        user_lastname: newUser.user_lastname,
        user_email: newUser.user_email,
        user_address: newUser.user_address,
        user_district: newUser.user_district,
        user_county: newUser.user_county,
        user_city: newUser.user_city,
        user_postal_code: newUser.user_postal_code,
        token: newUser.token,
    });    
}

//----------------------------------Get Login----------------------------------//
export const doLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // validate
        if (!(username && password)) {
            res.status(400).json({
                message: 'Please Input Data In Field',
                status: 400
            });
            return;
        }
        const user = await Users.findOne({ where: { user_email: username } });
        if (user && (await bcrypt.compare(password, user.user_password))) {

            // create token
            const token = jwt.sign({
                user_id: user.user_id,
                username,
                role: user.role
            },
            process.env.TOKEN_KEY, {
                expiresIn: '5h'
            });
            res.cookie('token', token, {
                maxAge: 3600000,
                httpOnly: true,
            });

            // Create session Users
            req.session.userId = user.user_id;

            req.session.user = {
                user_id: user.user_id,
                firstname: user.user_firstname,
                lastname: user.user_lastname,
                email: user.user_email,
                phone: user.user_phone,
                address: user.user_address,
                district: user.user_district,
                county: user.user_county,
                city: user.user_city,
                postal_code: user.user_postal_code,
                role: user.user_role,
            }

                res.redirect('/');
        } else {
            res.status(400).send({
                message: 'Invalid credentials',
                status: 400
            });
        }
    } catch (error) {
        res.status(400).json(`error : ${error}`);
    }
};



//----------------------------------Render Profile----------------------------------//
export const getLogout = async(req , res) => {
    
}
//----------------------------------Render Profile----------------------------------//
export const renderProfile = async(req , res) => {
    console.log(req.session.user);
    res.render('profile',);
}

//----------------------------------Get Profile----------------------------------//
export const getProfile = async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                status: 400
            });
        }

        const userData = await Users.findOne({ where: { user_id: userId } });

        if (!userData) {
            return res.status(404).json({
                message: 'User not found',
                status: 404
            });
        }

        res.status(200).json({
            userData: userData,
            status: 200
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            status: 500
        });
    }
};
//----------------------------------Get Confirm----------------------------------//
export const getConfirm = async (req, res) => {
    
}