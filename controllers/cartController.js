import {response} from "express";
import fs from 'fs';
import formidable from 'formidable';
import path from "path";
import {fileURLToPath} from 'url';
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import AddCart from "../models/addCart.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/order_item.model.js";
import axios from 'axios';

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
                id: productId,
                product: productName,
                price: productPrice,
                image: productImg,
                quantity: 1,
            };

            await Cart.create({
                cart_session_id: req.sessionID,
                cart_qty: proValue,
                cart_date: new Date().toISOString(),
                product_id: productId,
            });
        } else {
            cartItem.quantity += 1;
            
            await Cart.update(
                { cart_qty: cartItem.quantity },
                { where: { cart_session_id: req.sessionID, product_id: proId } }
            );
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
export const renderCheckout = async(req, res) =>{
    const cart = req.session.cart;
    const findProduct =  await Product.findAll();
    const productData = findProduct.map(product => ({
        id: product.id,
        name: product.product_name,
        image: product.product_image,
        description: product.product_description,
        price: product.product_price,
        priceSale: product.product_price_sale,
        qty: product.product_qty,
        number: product.categoryId
    }));
    res.render('checkout', {
        cart: cart ,
        productData : productData
    });
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


export const addSingleProduct = async (req, res) => {
    const proDataForm = req.body;

    if (!req.session.cart) {
        req.session.cart = {};
    }

    try {
        for (const proData of proDataForm) {
            const proId = proData.proId;
            const proValue = proData.proValue;

            const findProduct = await Product.findOne({ where: { id: proId } });

            if (!findProduct) {
                console.error('เกิดข้อผิดพลาดในการค้นหาสินค้า');
                return res.status(404).send('ไม่พบสินค้า');
            }

            const productName = findProduct.product_name;
            const productPrice = findProduct.product_price;
            const productImg = findProduct.product_image;
            const cartItem = req.session.cart[proId];

            if (!cartItem) {
                req.session.cart[proId] = {
                    id: proId,
                    product: productName,
                    price: productPrice,
                    image: productImg,
                    quantity: proValue,
                };

                // Save the cart item to the database
                await Cart.create({
                    cart_session_id: req.sessionID,
                    cart_qty: proValue,
                    cart_date: new Date().toISOString(),
                    product_id: proId,
                });
            } else {
                cartItem.quantity += proValue;

                // Update the quantity in the database
                await Cart.update(
                    { cart_qty: cartItem.quantity },
                    { where: { cart_session_id: req.sessionID, product_id: proId } }
                );
            }
        }

        // บันทึก session หลังจากที่เพิ่มสินค้าลงในตะกร้า
        req.session.save((err) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการบันทึก session:', err);
            }
        });

        res.status(200).send({ message: 'สินค้าถูกเพิ่มลงในตะกร้า', status: 200 });
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        res.status(400).send({ message: 'Exception', status: 400 });
    }
};

export const getCheckout = async (req, res) => {
    const {
    shoppingCost,
    deliveryType,
    firstName,
    lastName,
    telePhone,
    address,
    address1,
    district,
    county,
    province,
    postalCode,
    } = req.body;
    try {
    // Create Order
    const orderDate = new Date().toISOString();

    const order = await Order.create({
        order_date: orderDate,
        order_last_update: orderDate,
        order_status: 'new',
        order_shipping_first_name: firstName,
        order_shipping_last_name: lastName,
        order_shipping_address1: address,
        order_shipping_address2: address1,
        order_shipping_phone: telePhone,
        order_shipping_state: 'new',
        order_shipping_district: district,
        order_shipping_county: county,
        order_shipping_province: province,
        order_shipping_postal_code: postalCode,
        order_shipping_cost: shoppingCost,
        order_delivery_type: deliveryType,
    });

    for (const productId in req.session.cart) {
        const cartItem = req.session.cart[productId];
        const product = cartItem.product;
        const price = cartItem.price;
        const quantity = cartItem.quantity;

        await OrderItem.create({
        order_date: orderDate,
        order_qty: quantity,
        createdAt: orderDate,
        or_id: order.id, 
        pd_id: productId,
        });
    }

    res.status(200).send({
        message: 'สั่งซื้อสินค้าเรียบร้อยแล้ว',
        status: 200,
        orderId:order.id
    });
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        res.status(400).send({ message: 'Exception', status: 400 });
    }
};

export const getConfirm = async (req, res) => {
    
    const data = await Order.findAll();
    console.log(req.session.user);
    return;
    res.json(data);
}



