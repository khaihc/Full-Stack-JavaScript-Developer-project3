import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';
import Product from '../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  selectOptions: any[] = [];
  productId: string | null;
  private subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
  ) {
    this.productId = this.activatedRoute.snapshot.params['id'] || null;
  }

  ngOnInit(): void {
    this.selectOptions = this.productService.selectOptions;

    this.subscription.add(
      this.productService.getProductList().subscribe(
        (products: Product[]) => {
          this.product = products.find((product: Product) => product.id.toString() === this.productId);
          
          if (!this.product) {
            console.warn('Product not found');
          }
        }
      )
    );
  }

  updateQuantity(event: any, productId: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const newQuantity = parseInt(selectElement.value);
    this.productService.updateQuantity(productId, newQuantity -1);
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    alert('Add Product to Cart , Please clicking to cart to review')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}