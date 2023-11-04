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
    //console.log(cart);
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
                id: productId,
                product: productName,
                price: productPrice,
                image: productImg,
                quantity: 1,
            };
        } else {
            cartItem.quantity += 1;
        }        
        res.status(200).send({message: 'สินค้าถูกเพิ่มลงในตะกร้า', status: 200});
    } catch (error) {
        res.status(500).send({message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้าลงในตะกร้า', status: 500});
    }
}

//------------------------Destroy Session-----------------------------//
export const destroySession = async (req, res) => {
    const productId = req.body.id; // หรือวิธีดึง productId ออกจาก req.body ของคุณ
    const cart = req.session.cart;
    
    if (cart[productId]) {
        delete cart[productId];
        res.status(200).send({message: 'Product removed from cart.', status: 200});
    } else {
        res.status(400).send({message: 'Product not found in cart.', status: 400});
    }
}


//------------------------Checkout-----------------------------//
export const checkoutProduct = async(req, res) =>{
    const cart = req.session.cart;
    //console.log(scriptsData);
    res.render('checkout', {cart});
}

//------------------------Add product Session New-----------------------------//
export const addSession = async (req, res) => {
    const dataFromFrontend = req.body;

    try {
        if (!req.session.cart) {
            req.session.cart = {};
        }
        dataFromFrontend.forEach(productData => {
            const proId = productData.proId;
            const proValue = productData.proValue;

            if (req.session.cart[proId]) {
                const existingProduct = req.session.cart[proId];
                existingProduct.quantity = proValue; 
            } else {
                req.session.cart[proId] = {
                    id: proId,
                    quantity: proValue
                };
            }
        });

        res.status(200).send({ message: 'สินค้าถูกเพิ่มลงในตะกร้า', status: 200 });
    } catch (error) {
        res.status(400).send({ message: 'Exception', status: 400 });
    }
}




