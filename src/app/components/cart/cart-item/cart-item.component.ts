import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Cart } from '../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, OnDestroy {
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

  updateCartItemQuantity(event: any, productId: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const newQuantity = parseInt(selectElement.value);
    this.productService.updateCartItemQuantity(newQuantity, productId);
  }

  updateTotal(productId: number, quantity: number): void {
    this.productService.updateTotal(productId, quantity);
  }
}
