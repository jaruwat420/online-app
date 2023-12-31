import {response} from "express";
import User from "../models/user.model.js";
import path from "path";
import {fileURLToPath} from 'url';
import Users from "../models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//----------------------------------Scripts--------------------------------------------//
const scriptsData = {
    dataTable: '/js/user_datatable.js',
}

//----------------------------------Home--------------------------------------------//
export const renderHome = async (req, res) => {
    const user = await Users.findAll({attributes: ['user_id', 'role']});
    const userData = user.map(user => ({ id: user.user_id, role: user.role }));


    res.render('user', {
        layout: 'admin',
        title: "Admin || Panel",
        userData: userData
    });
}

//----------------------------------Get DataTable--------------------------------------------//
export const getDataTable = async (req, res) => {
    const data = await User.findAll({ attributes: ['user_id', 'user_firstname', 'user_lastname', 'user_email']});
    res.json(data);

}
//----------------------------------Delete Users--------------------------------------------//
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const userDestroy = await User.destroy({
            where:{
                user_id: userId
            }
        })
        res.status(201).json({ message: "ลบข้อมูลสำเร็จ" });        
    } catch (error) {
        res.status(400).json({ message: `เกิดข้อผิดพลาดในการลบข้อมูล ${error}.` });
    }

}
//----------------------------------Render Profile--------------------------------------------//


