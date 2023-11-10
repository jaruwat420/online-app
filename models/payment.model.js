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

const Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false,
    },
    bank_image: {
        type: DataTypes.STRING,
        field: 'bank_image',
        allowNull: false,
    },
    bank_name: {
        type: DataTypes.STRING,
        field: 'bank_name',
        allowNull: false,
    },
    bank_account: {
        type: DataTypes.STRING,
        field: 'bank_account',
        defaultValue: '',
    },
}, 
{
    timestamps: false,
    tableName: 'payment',
});

export default Payment;