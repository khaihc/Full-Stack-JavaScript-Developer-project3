import Product from './product'
export default class ItemInCart {
    product: Product;
    amount: number;

    constructor() {
        this.product = new Product();
        this.amount = 0;
    }
}