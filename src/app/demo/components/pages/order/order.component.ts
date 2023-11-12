import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent {
    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    tables: any[] = [
        {
            status: "Available",
            name: "Table 1",
            capacity: 4,
            tableId: 1
        },
        {
            status: "Occupied",
            name: "Table 2",
            capacity: 2,
            tableId: 2
        },
        {
            status: "Reserved",
            name: "Table 3",
            capacity: 6,
            tableId: 3
        },
        {
            status: "Available",
            name: "Table 4",
            capacity: 4,
            tableId: 4
        },
        {
            status: "Occupied",
            name: "Table 5",
            capacity: 2,
            tableId: 5
        },
        {
            status: "Reserved",
            name: "Table 6",
            capacity: 6,
            tableId: 6
        },
        {
            status: "Available",
            name: "Table 7",
            capacity: 4,
            tableId: 7
        },
        {
            status: "Occupied",
            name: "Table 8",
            capacity: 2,
            tableId: 8
        },
        {
            status: "Reserved",
            name: "Table 9",
            capacity: 6,
            tableId: 9
        },
        {
            status: "Available",
            name: "Table 10",
            capacity: 4,
            tableId: 10
        },
        {
            status: "Occupied",
            name: "Table 11",
            capacity: 2,
            tableId: 11
        },
        {
            status: "Reserved",
            name: "Table 12",
            capacity: 6,
            tableId: 12
        },
        {
            status: "Available",
            name: "Table 13",
            capacity: 4,
            tableId: 13
        },
        {
            status: "Occupied",
            name: "Table 14",
            capacity: 2,
            tableId: 14
        },
        {
            status: "Reserved",
            name: "Table 15",
            capacity: 6,
            tableId: 15
        },
        {
            status: "Available",
            name: "Table 16",
            capacity: 4,
            tableId: 16
        },
        {
            status: "Occupied",
            name: "Table 17",
            capacity: 2,
            tableId: 17
        },
        {
            status: "Reserved",
            name: "Table 18",
            capacity: 6,
            tableId: 18
        },
        {
            status: "Available",
            name: "Table 19",
            capacity: 4,
            tableId: 19
        },
        {
            status: "Occupied",
            name: "Table 20",
            capacity: 2,
            tableId: 20
        }
    ]

    product: any = {};

    selectedProducts: any[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    ref: DynamicDialogRef;
    constructor(
        private router: Router,
        private dialogService: DialogService,
        private storageSerive: StorageService,
        private messageService: MessageService) { }

    ngOnInit() {

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }




    getSeverity(status: string) {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'PENDING':
                return 'info';
            default:
                return 'danger';
        }
    }

    onRowSelect(data) {
        this.storageSerive.setItemLocal("currentProduct", data);
        this.router.navigate([`pages/product/product-detail/${data.productId}`])
    }

    public showToast(message, type) {
        this.messageService.add({ key: 'toast', severity: type, detail: message })
    }



    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.tables = this.tables.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.tables = this.tables.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.tables.length; i++) {
            if (this.tables[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createOrder() {

    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
