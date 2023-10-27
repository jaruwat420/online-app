import { response } from "express";
import { pool } from "../db.js";
import Categories from "../models/category.model.js";
import Product from "../models/product.model.js";


//----------------------------------Home--------------------------------------------//
export const renderHome = async (req, res) => {
    const categories = await Categories.findAll({attributes: ['id', 'category_name', 'category_image']});
    const categoriesData = categories.map(category => ({ id: category.id, name: category.category_name, image: category.category_image}));

    res.render('home', {
        title: "homepage",
        categoriesData: categoriesData,
    });
}

//----------------------------------Home--------------------------------------------//


