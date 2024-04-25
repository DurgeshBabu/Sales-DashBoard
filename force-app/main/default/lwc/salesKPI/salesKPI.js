import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/SalesKPI.getProducts';

export default class SalesKPI extends LightningElement {
    products = [];

    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
        } else if (error) {
            console.error('Error fetching products:', error);
        }
    }

    get totalSales() {
        return this.products.reduce((total, product) => total + product.Amount, 0);
    }

    get averageSales() {
        return this.totalSales / this.products.length || 0;
    }

    get topProduct() {
        if (this.products.length === 0) {
            return '';
        }

        let topProduct = this.products[0];
        this.products.forEach(product => {
            if (product.Amount > topProduct.Amount) {
                topProduct = product;
            }
        });

        return topProduct.Name;
    }
}
