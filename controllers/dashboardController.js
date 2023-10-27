import { response } from "express";
import { pool } from "../db.js";
import Categories from "../models/category.model.js";

//----------------------------------Home--------------------------------------------//
export const renderHome = async (req, res) => {
    res.render('dashboard', {layout: 'admin'});
}


