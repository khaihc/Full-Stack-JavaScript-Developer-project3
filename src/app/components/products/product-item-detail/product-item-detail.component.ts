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
    console.log("productId: ", this.productId);
    
    // Lấy selectOptions từ productService
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}