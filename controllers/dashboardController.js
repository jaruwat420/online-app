import { response } from "express";
import { pool } from "../db.js";
import fs from 'fs';
import Categories from "../models/category.model.js";
import Payment from "../models/payment.model.js";
import {fileURLToPath} from 'url';
import formidable from 'formidable';
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

//----------------------------------Home--------------------------------------------//
export const renderHome = async (req, res) => {
    res.render('dashboard', {layout: 'admin'});
}

//------------------------------Add Banner----------------------------------------//
export const  getdatatablePayment  = async (req, res) => {
    const data = await Payment.findAll();
    res.json(data);
   // res.json(data);
}
//----------------------------------Add Banner-------------------------------------//
export const setBanner = async (req, res) => {
    res.render('banner', {layout: 'admin'});
}

//----------------------------------Add Banner------------------------------------//
export const renderPayment = async (req, res) => {
    res.render('payment', {layout: 'admin'});
}

//------------------------------Add Banner----------------------------------------//
export const createPayment = async (req, res, next) => {
    const form = formidable({});
    form.uploadDir = path.join(publicDir, 'uploads/payment');
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(`error parse ${err}.`);
            return next(err);
        }

        const [bank_images] = files.bank_image;
        const bank_name = fields.bank_name;
        const bank_account = fields.bank_account;

        if (bank_images) {
            const oldpath = bank_images.filepath;
            const newFilePath = path.join(form.uploadDir, bank_images.originalFilename);

            const bank_names = Array.isArray(bank_name) ? bank_name.join(', ') : bank_name;
            const bank_accounts = Array.isArray(bank_account) ? bank_account.join(', ') : bank_account;

            fs.rename(oldpath, newFilePath, (err) => {
                if (err) {
                    return next();
                }
                try {
                    Payment.create({
                        bank_image: bank_images.originalFilename,
                        bank_name: bank_names,
                        bank_account: bank_accounts                        
                    })
                    res.status(201).json({ message: "เพิ่มข้อมูลสินค้าสำเร็จ!" ,status: "201"});
                } catch (error) {
                    res.status(400).json({ message:  `เกิดข้อผิดพลาด ${error}`});
                }
            })
        } else {
            res.status(400).json({error: 'No file uploaded.'});
        }
        
    });
}
export const deletePayment = async (req, res) => {
    const paymentId = req.params.id;
    
    try {
        await Payment.destroy({
            where:{
                id: paymentId
            }
        }); 
        res.status(201).json({ message: "ลบข้อมูลสำเร็จ" });  

    } catch (error) {
        
        res.status(400).json({ message: `เกิดข้อผิดพลาดในการลบข้อมูล ${error}.` });
    }
}


