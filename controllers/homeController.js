import { response } from "express";
import { pool } from "../db.js";

export const renderHome = async (req, res) =>{
    res.render('home');
}