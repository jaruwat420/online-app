import {response} from "express";
import {pool} from "../db.js";
import bcrypt from 'bcrypt';
import Users from '../models/user.model.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { json } from "sequelize";
import auth from '../middleware/auth.js';
import cookieParser from "cookie-parser";

dotenv.config({path: './.env'})

//----------------------------------Home----------------------------------//
export const getRegister = async (req, res) => {
    res.render('auth/register');
}


//----------------------------------Register----------------------------------//
export const register = async (req, res) => {
    const { firstname, lastname, email, password, passwordConfirm } = req.body;

    try {
        if (!(firstname && lastname && email && password && passwordConfirm)) {
            res.status(400).send("All input request!");
        }

        const oldUser = await Users.findOne({
            where: {
                user_email: email,
            }
        });

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
            user_password: newUser.user_password,
            token: newUser.token,
        });

    } catch (error) {
        console.log(error);
    }
}

//----------------------------------Login----------------------------------//
export const login = async (req, res) => {
   // console.log('Cookies: ', req.cookies)
    try {
        const {username,password} = req.body;

        //validate
        if (!(username && password)) {
            res.status(400).json("All input is require!");
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
        return;
    } catch (error) {
        res.status(400).json(`error :${error}`);
        return;
    }
}
