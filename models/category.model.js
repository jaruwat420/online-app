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

const Categories = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING,
        field: 'cat_name',
        allowNull: false,
    },
    category_image: {
        type: DataTypes.STRING,
        field: 'cat_image',
        allowNull: false,
    },
    category_detail: {
        type: DataTypes.STRING,
        field: 'cat_detail',
        defaultValue: '',
    },
}, 
{
    timestamps: false,
    tableName: 'category',
});

export default Categories;