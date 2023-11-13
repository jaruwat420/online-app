import {response} from "express";
import {pool} from "../db.js";
import bcrypt from 'bcrypt';
import Users from '../models/user.model.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import {json} from "sequelize";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import { uuid } from 'uuidv4';
import session from "express-session";

dotenv.config({path: './.env'});

// const stripe = ('stripe')(process.env.STRIPE_SECRET_KEY);
// const endpointSecret = pk_live_51OA2kLLynjVsncOr5vCDBLlpPCNCOdMajBI6e77IJJ0dvNMpPL3GnDmEeTj0KKvflE1v8bN1KtLCIfoZuLepcmjV00ceMHzjQi;


//----------------------------------Home----------------------------------//
export const checkout = async (req, res) => {
    const {user, product} = req.body;
    const orderId = uuid();

    const session = await stripe.checkout.session.create({
        payment_method_types: ['card'],
        line_item: [
            {
                price_data:{
                    currency: 'thb',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: 'payment',
        success_url: `localhost:8888/success.html?id=${orderId}`,
        cancel_url: `localhost:8888/cancel.html?id=${orderId}`,
    })
    console.log(session);
}
