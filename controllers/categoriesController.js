import {response} from "express";
import Categories from "../models/category.model.js";
import fs from 'fs';
import formidable from 'formidable';
import path from "path";
import {fileURLToPath} from 'url';
import Product from "../models/product.model.js";

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

//------------------------Delete Categories-----------------------------//
export const deleteCategories = async (req,res) => {

    const categoriesId = req.params.id;
    try {
        const categoriesDestroy = await Categories.destroy({
            where:{
                id:categoriesId
            }
        });
        res.status(201).json({ message: "ลบข้อมูลสำเร็จ" });      
    } catch (error) {
        res.status(400).json({ message: `เกิดข้อผิดพลาดในการลบข้อมูล ${error}.` });
    } 
    
}

//------------------------backend Index-----------------------------//
export const renderIndex = async (req, res) => {
    const categories = await Categories.findAll({ attributes: ['id', 'category_name', 'category_image']});
    const categoriesData = categories.map(category => ({ id: category.id, name: category.category_name }));

    const products = await Product.findAll({ attributes: ['id', 'product_name', 'product_image', 'product_description', 'product_price', 'product_qty'] });
    const productData = products.map(product => ({
        id: product.id,
        name: product.product_name,
        image: product.product_image,
        description: product.product_description,
        price: product.product_price,
        qty: product.product_qty
    }));

    res.render('index', {
        categoriesData: categoriesData,
        productData: productData,
        scriptsData:scriptsData
    });

}
//------------------------backend Index-----------------------------//
export const findCategories = async (req, res) => {
    const cat_id = (req.params.id); 
    const data = await Product.findAll({where:{cat_id: cat_id}});   
    res.json(data);

}