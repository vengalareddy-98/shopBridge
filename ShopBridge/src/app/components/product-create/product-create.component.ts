import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  product = {
    name: '',
    description: '',
    price:0,
    available: false,
  };
  //product:Product
  submitted: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  createProduct() {
    const data = {
      name: this.product.name,
      description: this.product.description,
    };
    this.productService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  newProduct() {
    this.submitted = false;
    this.product = {
      
      name: '',
      description: '',
      price: 10000,
      available: false,
    };
  }
}
