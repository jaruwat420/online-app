import { Sequelize,DataTypes } from 'sequelize';
import dotenv from 'dotenv'; 
import Product from "../models/product.model.js";
dotenv.config({ path: './.env'})

// config
const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;

const sequelize = new Sequelize('notification_system', 'root', 'root',{
    host: '127.0.0.1',
    port: 8889,
    dialect: 'mysql',
});

const Cart = sequelize.define('cart', {
    cart_id: {
        type: DataTypes.INTEGER,
        field: 'cart_id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    cart_session_id: {
        type: DataTypes.STRING,
        field: 'cart_session_id',
        allowNull: false,
    },
    cart_qty: {
        type: DataTypes.STRING,
        field: 'cart_qty',
        allowNull: false,
    },
    cart_date: {
        type: DataTypes.STRING,
        field: 'cart_date',
        defaultValue: false,
    }
    },
    
{
    timestamps: false,
    tableName: 'cart',
    
});
Cart.belongsTo(Product, { foreignKey: 'product_id' });

export default Cart;