import {response} from "express";
import {pool} from "../db.js";
import Users from '../models/user.model.js';
import jwt from "jsonwebtoken";
import Categories from "../models/category.model.js";
import formidable from "formidable";
import path from "path";
import {fileURLToPath} from 'url';
import { log } from "console";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptsData = {
    datatable: '/js/get_datatable.js',
    category: '/js/category.js',

}

export const renderIndex = async (req, res) => {
    res.render('index', {
        layout: 'admin',
        title: "Admin || Panel",
    });
}

// Get User
export const renderUser = async (req, res) => {
    res.render('user_detail', {
        layout: 'admin',
        title: "Admin || Panel",
        scriptsData: scriptsData,
    });
}

// Get DataTable use Models
export const getDatatable = async (req, res) => {

    try {
        const data = await Users.findAll();
        res.json(data);

    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while fetching users.'
        });
    }
};

export const getDataTableCategory = async (req, res) => {
    const data = await Categories.findAll();
    res.json(data);
};

export const renderCategory = async (req, res) => {
    res.render('category', {
        layout: 'admin',
        title: "Admin || Panel",
        scriptsData: scriptsData,
    });
};

// Add Categories
export const addCategory = async (req, res, next) => {
    try {
        const form = formidable({uploadDir: path.join(__dirname, '../public/uploads')});

        form.parse(req, async (err, fields, files) => {
            if (err) {
                    next(err);
                return;
            }
            const categoryName = fields.category_name;

            const categoryDetail = fields.category_detail;

            const categoryImage = files.category_image;

            if (categoryImage && categoryImage.name) {

                const newFileName = `${Date.now()}_${categoryImage.name}`;

                fs.rename(categoryImage.path, path.join(form.uploadDir, newFileName), (error) => {
                    if (error) {
                            next(error);
                        return;
                    }
                    const newCategory = new Categories({
                        category_name: categoryName,
                        category_image: newFileName,
                        category_detail: categoryDetail
                    });
                    newCategory.save();

                    res.json({
                        category_name: categoryName,
                        category_image: newFileName,
                        category_detail: categoryDetail
                    });
                });

            } else {

                res.status(400).json({error: 'No file uploaded'});
            }
        });
    } catch (error) {
        console.log(error);
    }
};