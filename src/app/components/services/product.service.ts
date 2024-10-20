import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import Product, { Cart } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productList: Product[] = [];
  public selectOptions = [
    {option: "Option 1", value: 1},
    {option: "Option 2", value: 2},
    {option: "Option 3", value: 3},
    {option: "Option 4", value: 4},
    {option: "Option 5", value: 5},
    {option: "Option 6", value: 6},
    {option: "Option 7", value: 7},
    {option: "Option 8", value: 8},
    {option: "Option 9", value: 9},
    {option: "Option 10", value: 10},
    {option: "Option 11", value: 11},
    {option: "Option 12", value: 12},
    {option: "Option 13", value: 13},
    {option: "Option 14", value: 14},
    {option: "Option 15", value: 15},
    {option: "Option 16", value: 16},
    {option: "Option 17", value: 17},
    {option: "Option 18", value: 18},
    {option: "Option 19", value: 19},
    {option: "Option 20", value: 20}
  ]
  cart: { [productId: string]: { product: Product; quantity: number } } = {};
  public cartSubject = new BehaviorSubject<any>(null);
  cartSubject$ = this.cartSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getProductList(): Observable<Product[]> {return this.http.get<Product[]>('./assets/data.json').pipe(
      catchError((error) => {
        console.error('Error fetching product list', error);
        return of([]);
      })
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
        delete this.cart[productId];
    } else {
      const product = this.getProductById(productId);
      this.cart[productId] = { product, quantity };
    }
  }

  getProductById(productId: number): Product {
    const product = this.productList.find(product => product.id === productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    return product;
  }

  addToCart(product: Product): void {
    const currentQuantity = this.cart[product.id]?.quantity || 0;
    if (currentQuantity > 0) {
        this.cart[product.id].quantity += 1;
    } else {
        this.cart[product.id] = { product, quantity: 1 };
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): { products: { id: number; name: string; price: number; quantity: number }[]; total: number } {
    let totalPrice = 0;
    const productsInCart = [];

    for (const item of Object.values(this.cart)) {
        const { product, quantity } = item;
        totalPrice += product.price * quantity;

        productsInCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            url: product.url,
            description: product.description,
            quantity: quantity
        });
    }

    const updatedCart = { products: productsInCart, total: totalPrice };
    this.setCart(updatedCart);
    return updatedCart;
}



  updateCartItemQuantity(quantity: number, productId: number): void {
    const getCart = this.getCart();

    let findItem = getCart.products.find((i: Cart | any) => i.id === productId);
    findItem.quantity = quantity;
  }

  updateTotal(productId: number, quantity: number): void {
    if (quantity <= 0) {
      const confirmRemove = confirm('Remove product?');
      if (confirmRemove) {
        delete this.cart[productId];
        this.setCart(this.calculateTotalPrice());
      }
    } else {
      let cartItem = this.cart[productId];
  
      if (!cartItem) {
        const product = this.getProductById(productId);
        if (product) {
          cartItem = { product, quantity };
          this.cart[productId] = cartItem;
        } else {
          console.error('Product not found');
          return;
        }
      } else {
        cartItem.quantity = quantity;
      }
  
      this.setCart(this.calculateTotalPrice());
    }
  }

  clearData(): void {
    this.cart = {};
    const updatedCart = this.calculateTotalPrice();
    this.setCart(updatedCart);
}

  setCart(cart: Cart | any) {
    this.cartSubject.next(cart);
  }

  getCart(): Cart | any {
    return this.cartSubject.value;
  }
}
