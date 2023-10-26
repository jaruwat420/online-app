import {response} from "express";
import {pool} from "../db.js";
import Users from '../models/user.model.js';
import jwt from "jsonwebtoken";
import Categories from "../models/category.model.js";
import path from "path";
import {fileURLToPath} from 'url';
import fs from 'fs';
import formidable from "formidable";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//----------------------------------Scripts--------------------------------------------//
const scriptsData = {
    datatable: '/js/get_datatable.js',
    category: '/js/category.js',

}

//----------------------------------Home--------------------------------------------//
export const renderIndex = async (req, res) => {
    res.render('index', {
        layout: 'admin',
        title: "Admin || Panel",
    });
}

//----------------------------------User--------------------------------------------//
export const renderUser = async (req, res) => {
    res.render('user_detail', {
        layout: 'admin',
        title: "Admin || Panel",
        scriptsData: scriptsData,
    });
}

//----------------------------------Get DataTable----------------------------------//
export const get_datatable = async (req, res) => {
    res.render('user_detail', {
        layout: 'admin',
        title: "Admin || Panel",
        scriptsData: scriptsData,
    });
}

