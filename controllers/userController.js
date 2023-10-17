import {response} from "express";
import { pool } from "../db.js";


export const getIndex = async (req, res) => {
    res.render('backend/index');
}