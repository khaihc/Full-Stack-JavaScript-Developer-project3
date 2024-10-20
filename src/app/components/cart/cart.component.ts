import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from '../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart | any;
  private subscription: Subscription = new Subscription();
  fullName: string = '';
  address: string = '';
  creditCard: string = '';
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.productService.cartSubject$.subscribe(cart => {
        this.cart = cart;
      })
    );
  }

  handleSubmit() {
    this.router.navigateByUrl(`confirmation?fullName=${this.fullName}&totalPrice=${this.cart?.total ?? 0}`);
    this.clearData();
    alert('Submit!!!')
  }

  clearData() {
    this.productService.clearData();
    this.fullName = '';
    this.address = '';
    this.creditCard = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
