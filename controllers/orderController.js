import { response } from "express";
import fs from 'fs';
import formidable from 'formidable';
import path from "path";
import { fileURLToPath } from 'url';
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import AddCart from "../models/addCart.js";
import { log } from "console";
import { param } from "express-validator";
import Order from "../models/order.model.js";
import OrderItem from "../models/order_item.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

//------------------------render Home-----------------------------//
export const renderHome = async (req, res) => {
    res.render('order', { layout: 'admin' });
}

//------------------------Render Confirm-----------------------------//
export const getConfirm = async (req, res) => {
    const orderId = req.params.id;
    // const order = await Order.findAll({ where:{ id: orderId }});

    // const orderData = order.map(order => ({
    //     id: order.id,
    //     date: order.order_date,
    //     firstName: order.order_shipping_first_name,
    //     lastName: order.order_shipping_last_name,
    //     address: order.order_shipping_address1,
    //     address1: order.order_shipping_address2,
    //     phone: order.order_shipping_phone,
    //     state: order.order_shipping_state,
    //     district: order.order_shipping_district,
    //     county: order.order_shipping_county,
    //     province: order.order_shipping_province,
    //     postalCode: order.order_shipping_postal_code,
    //     shippingCost: order.order_shipping_cost,
    //     shippingProvince: order.order_shipping_province,
    // }));

    // res.render('confirmation', { orderData });
    Order.findAll({
        include: [
            {
                model: OrderItem,
                attributes: ['id', 'order_date', 'order_qty'], 
            },
            {
                model: Product,
                attributes: ['id', 'product_name', 'product_price', 'product_qty'],
            },
        ],
    })
        .then((Order) => {
            console.log(`success message: ${Order}`);
        })
        .catch((error) => {
            console.error(`error message: ${error}`);
        });
}

//------------------------Get DataTable-----------------------------//
export const getDataTable = async (req, res) => {
    const order = await Order.findAll();
    const data = order.map(order => ({
            id: order.id,
            date: order.order_date,
            firstName: order.order_shipping_first_name,
            lastName: order.order_shipping_last_name,
            address: order.order_shipping_address1,
            address1: order.order_shipping_address2,
            phone: order.order_shipping_phone,
            state: order.order_shipping_state,
            district: order.order_shipping_district,
            county: order.order_shipping_county,
            province: order.order_shipping_province,
            postalCode: order.order_shipping_postal_code,
            shippingCost: order.order_shipping_cost,
            shippingProvince: order.order_shipping_province,
        }));
    res.json(data);
}


