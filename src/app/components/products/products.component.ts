import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import Product from '../models/product';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy {
  @Output() productAdded = new EventEmitter<Product>();
  products: Product[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.subscription.add(
      this.productService.getProductList().subscribe((products) => {
        this.products = products ?? [];
        this.productService.productList = this.products;
      })
    );
  }

  onProductAdded(product: Product): void {
    this.productAdded.emit(product);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
