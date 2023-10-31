import {response} from "express";
import fs from 'fs';
import formidable from 'formidable';
import path from "path";
import {fileURLToPath} from 'url';
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import AddCart from "../models/addCart.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

//------------------------Scripts-----------------------------//
const scriptsData = {
    datatable: '/js/get_datatable.js',
    category: '/js/category.js',
    categories_list: '/js/categories_list.js',

}

//------------------------render index-----------------------------//
export const renderHome = async (req, res) =>{
    const cart = req.session.cart;    
    res.render('cart', {cart});
}
//------------------------Add product to Cart Session-----------------------------//
export const addCart = async (req, res, next) => {
    const productId = req.params.id;
    
    if (!req.session.cart) {
        req.session.cart = {};
    }

    try {
        const findProduct = await Product.findOne({ where: { id: productId } });
        if (!findProduct) {
            console.error('เกิดข้อผิดพลาดในการค้นหาสินค้า');
            return res.status(404).send('ไม่พบสินค้า');
        }
        
        const productName = findProduct.product_name;
        const productPrice = findProduct.product_price;
        const productImg = findProduct.product_image;
        const cartItem = req.session.cart[productId];

        if (!cartItem) {
            req.session.cart[productId] = {
                product:productName,
                price: productPrice,
                image: productImg,
                quantity: 1,
            };
        } else {
            cartItem.quantity += 1;
        }
        console.log('ตะกร้า:', req.session.cart);
        
        res.status(200).send({message: 'สินค้าถูกเพิ่มลงในตะกร้า', status: 200});
    } catch (error) {
        res.status(500).send({message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้าลงในตะกร้า', status: 500});
    }
}

//------------------------Destroy Session-----------------------------//
export const destroySession = async (req, res) => {
    const productId = req.body;
    console.log(productId);
}

//------------------------Checkout-----------------------------//
export const checkoutProduct = async(req, res) =>{
    res.render('checkout');
}

