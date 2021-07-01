import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  currentProduct:any = '';
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getProduct(id): any {
    this.productService.read(id).subscribe(
      (product) => {
        this.currentProduct = product;
        console.log(product);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setAvailableStatus(status): any {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      price:this.currentProduct.price,
      available: status,
    };

    this.productService.update(this.currentProduct.id, data).subscribe(
      (response) => {
        this.currentProduct.available = status;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProduct(): any {
    this.productService
      .update(this.currentProduct.id, this.currentProduct)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = 'The product was updated!';
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteProduct(): any {
    this.productService.delete(this.currentProduct.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
