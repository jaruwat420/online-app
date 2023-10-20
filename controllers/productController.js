import { response } from "express";
import { pool } from "../db.js";

import Categories from "../models/category.model.js";

const scriptsData = {
    product: '/js/getDataTable.js',
    product: '/js/product.js',
}
//------------------------Home-----------------------------//
export const renderHome = async (req, res) => {
    const [categories] = await Categories.findAll({attributes: ['id', 'category_name']});
    
    res.render('product' ,{
        layout: 'admin',
        categories: categories,
        scriptsData: scriptsData,
    });
}

//------------------------Get DataTable Product-----------------------------//
export const getDataTable = async (req, res) => {
    res.render('product' ,{
        layout: 'admin',
        scriptsData: scriptsData,
    });
}

//------------------------Create Product-----------------------------//
export const createProduct = async (req, res) => {
    res.render('product' ,{
        layout: 'admin',
        scriptsData: scriptsData,
    });
}
