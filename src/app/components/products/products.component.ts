import { Component } from '@angular/core';
import Product from '../models/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.productService.getProductList().subscribe((products) => {
      this.products = products ?? [];
    })
  }
}
