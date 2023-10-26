import { response } from "express";
import { pool } from "../db.js";
import fs from 'fs';
import formidable from 'formidable';
import path from "path";
import {fileURLToPath} from 'url';
import Categories from "../models/category.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');


const scriptsData = {
    dataTable: '/js/getDataTable.js',
    product: '/js/product.js',
}
//------------------------------------Home------------------------------------//
export const renderHome = async (req, res) => {
    const categories = await Categories.findAll();
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

//--------------------------Create Product-----------------------------------//
export const createProduct = async (req, res, next) => {
    const form = formidable({});
    form.uploadDir = path.join(publicDir, 'uploads');

    form.parse(req, (err, fields, files) =>{
        if (err) {
            console.log(`error parse ${err}.`);
            return next();
        }
        const categoryName = fields.product_name;
        const productImage = files.product_image;
        const productDescription = fields.product_description;
        const productPrice = fields.product_price;
        const productQty = fields.product_qty;

        if (productImage) {
            
        }

    });

}
