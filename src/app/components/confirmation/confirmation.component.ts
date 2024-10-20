import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
  fullName = this.activatedRoute.snapshot.queryParams['fullName'] || '';
  totalPrice = this.activatedRoute.snapshot.queryParams['totalPrice'] || '';
  ngOnInit(): void {

  }
  toProductList() {
    this.router.navigateByUrl('/product')
  }
}
