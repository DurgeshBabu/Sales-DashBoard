import { LightningElement, wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/ChartJS';
import getSalesData from '@salesforce/apex/SalesChart.getSalesData';

export default class SalesChart extends LightningElement {

    chart;
    error;
    salesData;

    @wire(getSalesData)
    wiredSalesData({ error, data }) {
        if (data) {
            this.salesData = data;
            if (this.chart) {
                this.chart.destroy();
            }
            this.renderChart();
        } else if (error) {
            this.error = error;
        }
    }

    renderedCallback() {
        if (!this.chart) {
            Promise.all([
                loadScript(this, chartjs + '/ChartJs.js')
            ])
            .then(() => {
                this.renderChart();
            })
            .catch(error => {
                this.error = error;
            });
        }
    }

    renderChart() {
        const ctx = this.template.querySelector('.Sales-Chart').getContext('2d');
        this.chart = new window.Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Sales',
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54,162,235)',
                    data: this.salesData,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    disconnectedCallback() {
        if (this.chart) {
            this.chart.destroy()
        }
    }
}
