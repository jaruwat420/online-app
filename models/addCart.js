class AddCart {
    constructor(existingCart) {
        this.products = existingCart.products || {};
    }

    addProduct(product, productId) {
        const storedProduct = this.products[productId];

        if (!storedProduct) {
            this.products[productId] = {
                quantity: 1,
                price: product.price,
                // เพิ่มข้อมูลอื่น ๆ เกี่ยวกับสินค้าตรงนี้
            };
        } else {
            storedProduct.quantity++;
        }
    }

    // อื่น ๆ เมธอดที่เกี่ยวข้องกับตะกร้า
}

export default AddCart;

