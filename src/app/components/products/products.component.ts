import { Component, OnInit, OnDestroy } from '@angular/core';
import Product from '../models/product';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.subscription.add(
      this.productService.getProductList().subscribe((products) => {
        this.products = products ?? [];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
