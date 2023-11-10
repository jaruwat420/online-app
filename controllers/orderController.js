import {response} from "express";
import fs from 'fs';
import formidable from 'formidable';
import path from "path";
import {fileURLToPath} from 'url';
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import AddCart from "../models/addCart.js";
import { log } from "console";
import { param } from "express-validator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

//------------------------Scripts-----------------------------//
const scriptsData = {
    datatable: '/js/get_datatable.js',
    category: '/js/category.js',
    categories_list: '/js/categories_list.js',

}

//------------------------render Home-----------------------------//
export const renderHome = async (req, res) =>{
    res.render('order', {layout: 'admin'});
}

//------------------------render Home-----------------------------//
export const createOrder = async (req, res) =>{
    // res.render('order', {layout: 'admin'});
    console.log(res.body);
}
//------------------------render confirm-----------------------------//
export const renderConfirm = async(req, res) => {
    res.render('confirmation');
}


