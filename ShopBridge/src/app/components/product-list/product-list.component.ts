import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any;
  currentProduct = null;
  currentIndex = -1;
  name = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.readProducts();
  }
  readProducts() {
    this.productService.readAll().subscribe(
      (products) => {
        this.products = products;
        console.log(products);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  refresh(): any {
    this.readProducts();
    this.currentProduct = null;
    this.currentIndex = -1;
  }

  setCurrentProduct(product, index): any {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  deleteAllProducts(): any {
    this.productService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.readProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchByName(): any {
    this.productService.searchByName(this.name).subscribe(
      (products) => {
        this.products = products;
        console.log(products);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
