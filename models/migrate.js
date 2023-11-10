import Categories from '../models/category.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import Cart from '../models/cart.model.js';
import OrderItem from '../models/order_item.model.js';
import Order from '../models/order.model.js';
import Payment from '../models/payment.model.js';

async function migrateModel() {
    try {
        await Categories.sync({ force: true });
        await Product.sync({ force: true });
        await User.sync({ force: true });
        await Cart.sync({ force: true });
        await Order.sync({ force: true });
        await Payment.sync({ force: true });
        await OrderItem.sync({ force: true });
        console.log('Models have been synchronized and tables have been created.');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

migrateModel();
