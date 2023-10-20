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
        field: 'category_name',
        allowNull: false,
    },
    category_image: {
        type: DataTypes.STRING,
        field: 'category_image',
        allowNull: false,
    },
    category_detail: {
        type: DataTypes.STRING,
        field: 'category_detail',
        defaultValue: false,
    },
}, {
    timestamps: false,
    tableName: 'category',
});

export default Categories;