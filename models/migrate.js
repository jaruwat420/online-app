import Categories from '../models/category.model.js';
import product from '../models/product.model.js';
import User from '../models/user.model.js';
import Cart from '../models/cart.model.js';

async function migrateModel() {
    try {
        await Categories.sync({ force: true });
        await product.sync({ force: true });
        await User.sync({ force: true });
        await Cart.sync({ force: true });
        console.log('Models have been synchronized and tables have been created.');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

migrateModel();
