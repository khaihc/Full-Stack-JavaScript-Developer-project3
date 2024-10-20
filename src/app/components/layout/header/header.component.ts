import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cart: Cart | any;
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.productService.cartSubject$.subscribe(cart => {
        this.cart = cart;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
