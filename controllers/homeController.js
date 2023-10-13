import { response } from "express";
import { pool } from "../db.js";

export const renderHome = async (req, res) => {
    res.render('home', {
        title: "homepage"
    });
}

export const renderAbout = async (req, res) => {
    res.render('about');
}

export const renderMessage = async (req, res) => {
    res.render('success');
}