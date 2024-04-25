import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/SalesTable.getProducts';

export default class SalesTable extends LightningElement {
    products = [];

    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
        } else if (error) {
            console.error('Error fetching products:', error);
        }
    }

    sortedBy;
    sortedDirection = 'asc';

    sortBy(field) {
        let sortDirection = this.sortedDirection === 'asc' ? 1 : -1;
        this.products = [...this.products.sort((a, b) =>
           (a[field] > b[field] ? sortDirection : -sortDirection)
        )];
    }

    sortByProductName() {
        this.sortedBy = 'productName';
        this.sortBy('Name');
    }

    sortByQuantity() {
        this.sortedBy = 'quantity';
        this.sortBy('Quantity');
    }

    sortByAmount() {
        this.sortedBy = 'amount';
        this.sortBy('Amount');
    }
}
