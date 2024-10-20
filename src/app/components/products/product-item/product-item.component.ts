import { Component, EventEmitter, Input, Output } from '@angular/core';
import Product from '../../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Output() productAdded = new EventEmitter<Product>();
  @Input() product: Product = new Product();
  selectOptions = this.productService.selectOptions;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  productDetail(id: number): void {
    this.router.navigateByUrl(`/product/${id}`);
  }

  updateQuantity(event: any, productId: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const newQuantity = parseInt(selectElement.value);
    this.productService.updateQuantity(productId, newQuantity);
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.productAdded.emit(product);
    alert('Add Product to Cart , Please clicking to cart to review')
  }
}
