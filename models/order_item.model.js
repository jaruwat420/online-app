import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
dotenv.config({ path: './.env' });

const sequelize = new Sequelize('notification_system', 'root', 'root', {
    host: '127.0.0.1',
    port: 8889,
    dialect: 'mysql',
});

// Define the OrderItem model
const OrderItem = sequelize.define('orderitem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

OrderItem.belongsTo(Order, { foreignKey: 'or_id' });
OrderItem.belongsTo(Product, { foreignKey: 'pd_id' });

export default OrderItem;

