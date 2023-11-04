import { response } from "express";
import { pool } from "../db.js";
import Categories from "../models/category.model.js";
import Product from "../models/product.model.js";


//----------------------------------Home--------------------------------------------//
export const renderHome = async (req, res) => {
    // const categories = await Categories.findAll({attributes: ['id', 'category_name', 'category_image']});
    // const categoriesData = categories.map(category => ({ id: category.id, name: category.category_name, image: category.category_image}));
    
    const product = await Product.findAll({where: {cat_id:3}});
    const productData = product.map(product => (
        {id: product.id, 
        name: product.product_name, 
        image: product.product_image,
        description: product.product_description,
        price: product.product_price,
        qty: product.product_qty
    }));


    res.render('home', {
        title: "HomePages",
        productData: productData,


    });
}

//----------------------------------Home--------------------------------------------//


