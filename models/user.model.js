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

const Users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    user_firstname: {
        type: DataTypes.STRING,
        field: 'user_firstname',
        allowNull: false,
    },
    user_lastname: {
        type: DataTypes.STRING,
        field: 'user_lastname',
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        field: 'user_email',
        defaultValue: false,
    },
    user_password: {
        type: DataTypes.STRING,
        field: 'user_password',
        defaultValue: '',
    },
    user_password1: {
        type: DataTypes.STRING,
        field: 'user_password1',
        defaultValue: '',
    },
    user_address: {
        type: DataTypes.STRING,
        field: 'user_address',
        defaultValue: '',
    },
    user_phone: {
        type: DataTypes.STRING,
        field: 'user_phone',
        defaultValue: '',
    },
    user_district: {
        type: DataTypes.STRING,
        field: 'user_district',
        defaultValue: '',
    },
    user_county: {
        type: DataTypes.STRING,
        field: 'user_county',
        defaultValue: '',
    },
    user_city: {
        type: DataTypes.STRING,
        field: 'user_city',
        defaultValue: '',
    },
    user_postal_code: {
        type: DataTypes.STRING,
        field: 'user_postal_code',
        defaultValue: '',
    },
    user_role: {
        type: DataTypes.STRING, 
        field: 'user_role',
        defaultValue: 'user', 
    },
}, {
    timestamps: false,
    tableName: 'users',
});

export default Users;