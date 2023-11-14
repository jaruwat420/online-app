import { Sequelize,DataTypes } from 'sequelize';
import dotenv from 'dotenv'; 
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

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    order_date: {
        type: DataTypes.STRING,
        field: 'order_date',
        allowNull: false,
    },
    order_last_update: {
        type: DataTypes.STRING,
        field: 'order_last_update',
        allowNull: false,
    },
    order_status: {
        type: DataTypes.STRING,
        field: 'order_status',
        allowNull: false,
    },
    order_shipping_first_name: {
        type: DataTypes.STRING,
        field: 'order_shipping_first_name',
        defaultValue: '',
    },
    order_shipping_last_name: {
        type: DataTypes.STRING,
        field: 'order_shipping_last_name',
        defaultValue: '',
    },
    order_shipping_address1: {
        type: DataTypes.STRING,
        field: 'order_shipping_address1',
        defaultValue: '',
    },
    order_shipping_address2: {
        type: DataTypes.STRING,
        field: 'order_shipping_address2',
        defaultValue: '',
    },
    order_shipping_phone: {
        type: DataTypes.STRING,
        field: 'order_shipping_phone',
        defaultValue: '',
    },
    order_shipping_state: {
        type: DataTypes.STRING,
        field: 'order_shipping_state',
        defaultValue: '',
    },
    order_shipping_district: {
        type: DataTypes.STRING,
        field: 'order_shipping_district',
        defaultValue: '',
    },
    order_shipping_county: {
        type: DataTypes.STRING,
        field: 'order_shipping_county',
        defaultValue: '',
    },
    order_shipping_province: {
        type: DataTypes.STRING,
        field: 'order_shipping_province',
        defaultValue: '',
    },
    order_shipping_postal_code: {
        type: DataTypes.STRING,
        field: 'order_shipping_postal_code',
        defaultValue: '',
    },
    order_shipping_cost: {
        type: DataTypes.STRING,
        field: 'order_shipping_cost',
        defaultValue: '',
    },
    order_delivery_type: {
        type: DataTypes.STRING,
        field: 'order_delivery_type',
        defaultValue: '',
    },
}, 
{
    timestamps: false,
    tableName: 'order',
});

export default Order;