import { Component, Input } from '@angular/core';
import Product from '../../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = new Product();

  selectOptions = this.productService.selectOptions;

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  productDetail(id: number): void {
    this.router.navigateByUrl(`/product/${id}`)
  }
}
