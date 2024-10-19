import { Component, Input } from '@angular/core';
import Product from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = new Product();

  selectOptions = [
    {option: "Option 1", value: 1},
    {option: "Option 2", value: 2},
    {option: "Option 3", value: 3},
    {option: "Option 4", value: 4},
    {option: "Option 5", value: 5}
  ]

  constructor(
    private router: Router) { 
  }

  ngOnInit(): void {
    console.log("-----------product-----------", this.product)
  }

  productDetail(id: number): void {
    this.router.navigateByUrl(`/product/${id}`)
  }
}
