import { response } from "express";
import { pool } from "../db.js";
import fs from 'fs';
import formidable from 'formidable';
import path from "path";
import {fileURLToPath} from 'url';
import Categories from "../models/category.model.js";
import Product from "../models/product.model.js";
import handlebars  from "express-hbs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public');

//---------------------scriptsData--------------------------------//

const scriptsData = {
    dataTable: '/js/getDataTable.js',
    product: '/js/product.js',
}
//------------------------------------helpers-------------------------------//
// handlebars.registerHelper('selected', function(selected, option){
//     return (selected == option) ? 'selected="selected"' : '';
// });
handlebars.create({
    helpers: {
    renderCategoryOptions: function(categoriesData, selectedValue) {
        let optionsHtml = '';
        categoriesData.forEach(category => {
        optionsHtml += `<option value="${category.id}" ${category.id === selectedValue ? 'selected' : ''}>${category.name}</option>`;
        });
        return optionsHtml;
    }
    }
});
//------------------------------------Home------------------------------------//
export const renderHome = async (req, res) => {
    const categories = await Categories.findAll({ attributes: ['id', 'category_name']});
    const categoriesData = categories.map(category => ({ id: category.id, name: category.category_name }));

    res.render('product' ,{
        layout: 'admin',
        scriptsData: scriptsData,
        categoriesData:categoriesData,        
    });
}

//------------------------Get DataTable Product-----------------------------//
export const getDataTable = async (req, res) => {
    const data = await Product.findAll();
    res.json(data);
}

//--------------------------Create Product-----------------------------------//
export const createProduct = async (req, res, next) => {
    const form = formidable({});
    form.uploadDir = path.join(publicDir, 'uploads');
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(`error parse ${err}.`);
            return next(err);
        }

        const categoriesType = fields.categories_select;
        const productName = fields.product_name;
        const [productImage] = files.product_image;
        const productDescription = fields.product_description;
        const productPrice = fields.product_price;
        const productPriceSale = fields.product_price_sale;
        const productQty = fields.product_qty;

        if (productImage) {
            const oldPath = productImage.filepath;
            const newFilePath = path.join(form.uploadDir, productImage.originalFilename);

            const categoryTypes = Array.isArray(categoriesType) ? categoriesType.join(', ') : categoriesType;
            const productNames = Array.isArray(productName) ? productName.join(', ') : productName;
            const productDescriptions = Array.isArray(productDescription) ? productDescription.join(', ') : productDescription;
            const productPrices = Array.isArray(productPrice) ? productPrice.join(', ') : productPrice;
            const productPriceSales = Array.isArray(productPriceSale) ? productPriceSale.join(', ') : productPriceSale;
            const productQtys = Array.isArray(productQty) ? productQty.join(', ') : productQty;
            
            fs.rename(oldPath, newFilePath, (err) => {
                if (err) {
                    return next(err);
                }

                try {
                    Product.create({
                        product_name: productNames,
                        product_image: productImage.originalFilename,
                        product_description: productDescriptions,
                        product_price: productPrices,
                        product_price_sale: productPriceSales,
                        product_qty: productQtys,
                        categoryId: categoryTypes,
                    });
                    res.status(201).json({ message: "เพิ่มข้อมูลสินค้าสำเร็จ!" ,status: "201"});
                } catch (error) {
                    res.status(400).json({ message:  `เกิดข้อผิดพลาด ${error}`});
                }
            });
        } else {
            res.status(400).json({error: 'No file uploaded.'});
        }
    });
}

//--------------------------Update Product-----------------------------------//
export const updateProduct = async (req, res) => {
    const productId = req.params.id;
   // console.log(productId);

}


//--------------------------Delete Product-----------------------------------//
export const deleteProduct = async (req, res) => {

    const productId = req.params.id;

    try {
        const productDestroy = await Product.destroy({
            where:{
                id: productId
            }
        }); 
        res.status(201).json({ message: "ลบข้อมูลสำเร็จ" });        
    } catch (error) {
        res.status(400).json({ message: `เกิดข้อผิดพลาดในการลบข้อมูล ${error}.` });
    }
    
}

//--------------------------Product Details-----------------------------------//
export const productDetail = async (req, res) => {
    const productId = req.params.id;
    const productFind = await Product.findAll({where:{id: productId}});
    const categoriesData = productFind.map(product => ({ id: product.id, name: product.product_name, image: product.product_image, description: product.product_description, price: product.product_price, qty: product.product_qty, category: product.categoryId}));
    
    const products = await Product.findAll({ attributes: ['id', 'product_name', 'product_image', 'product_description', 'product_price', 'product_qty'] });
    const productData = products.map(product => ({
        id: product.id,
        name: product.product_name,
        image: product.product_image,
        description: product.product_description,
        price: product.product_price,
        qty: product.product_qty
    }));
    res.render('single-product', {categoriesData, productData});
}