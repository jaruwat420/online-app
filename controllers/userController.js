import {response} from "express";
import { pool } from "../db.js";


export const getIndex = async (req, res) => {
    res.render('index',  { 
        layout: 'admintemplate',
        title : "Admin || Panel"
    });
}

export const getUser = async (req, res) => {
    res.render('user_detail',  { 
        layout: 'admintemplate',
        title : "Admin || Panel"
    });
}