import { response } from "express";
import { pool } from "../db.js";

export const renderHome = async (req, res) => {
    res.render('home', {title: "homepage"
    });
}

export const renderSecret = async (req, res) => {
    res.render('secret');
}

//----------------------------------User--------------------------------------------//
export const renderAbout = async (req, res) => {
    res.render('backend/index');
}

