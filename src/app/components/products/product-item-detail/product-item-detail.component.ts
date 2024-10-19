import { Component } from '@angular/core';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent {

  selectOptions = [
    {
      option: "Option 1",
      value: 1
    }, {
      option: "Option 2",
      value: 2
    }, {
      option: "Option 3",
      value: 3
    }, {
      option: "Option 4",
      value: 4
    }, {
      option: "Option 5",
      value: 5
    }
  ]
}
