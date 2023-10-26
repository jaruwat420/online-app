import {response} from "express";
import Categories from "../models/category.model.js";

import fs from 'fs';
import formidable from 'formidable';
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

//------------------------Scripts-----------------------------//
const scriptsData = {
    datatable: '/js/get_datatable.js',
    category: '/js/category.js',
}

//------------------------index-----------------------------//
export const renderHome = async (req, res) => {
    res.render('category', {
        layout: 'admin',
        title: "Admin || Panel",
        scriptsData: scriptsData,
    });
};

//------------------------Get DataTable Categories-----------------------------//
export const dataTableCategories = async (req, res) => {
    const data = await Categories.findAll();
    res.json(data);
}

//------------------------Create Categories-----------------------------//
export const createCategories = async (req, res, next) => {

    const form = formidable({});
    form.uploadDir = path.join(publicDir, 'uploads');
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        const categoryName = fields.category_name;
        const categoryDetail = fields.category_description;
        const [categoryImage] = files.category_image;
        if (categoryImage) {
            const oldPath = categoryImage.filepath;

            const newFilePath = path.join(form.uploadDir, categoryImage.originalFilename);

            const categoryNames = Array.isArray(categoryName) ? categoryName.join(', ') : categoryName;
            const categoryDetails = Array.isArray(categoryDetail) ? categoryDetail.join(', ') : categoryDetail;

            fs.rename(oldPath, newFilePath, (error) => {
                if (error) {
                    return next(error);
                }
                try {
                    Categories.create({
                        category_name: categoryNames,
                        category_image: categoryImage.originalFilename,
                        category_detail: categoryDetails,
                    })
                    res.json({
                        message: 'Create Data Success Fully.',
                        status: 201
                    });

                } catch (dbError) {
                    return next(dbError);
                }
            });
        } else {
            res.status(400).json({
                error: 'No file uploaded.'
            });
        }
    });
};