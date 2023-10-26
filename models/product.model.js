import { Sequelize,DataTypes } from 'sequelize';
import dotenv from 'dotenv'; 
dotenv.config({ path: './.env'})

// config
const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;

const sequelize = new Sequelize(database, user, password,{
    host: host,
    port: port,
    dialect: 'mysql',
});

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    product_name: {
        type: DataTypes.STRING,
        field: 'pd_name',
        allowNull: false,
    },
    product_image: {
        type: DataTypes.STRING,
        field: 'pd_image',
        allowNull: false,
    },
    product_description: {
        type: DataTypes.STRING,
        field: 'pd_description',
        defaultValue: false,
    },
    product_price: {
        type: DataTypes.STRING,
        field: '	pd_price',
        defaultValue: false,
    },
    product_qty: {
        type: DataTypes.STRING,
        field: 'pd_qty',
        defaultValue: false,
    },
    
}, {
    timestamps: false,
    tableName: 'users',
});

export default Product;