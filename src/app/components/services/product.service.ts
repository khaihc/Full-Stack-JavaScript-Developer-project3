import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Product from '../models/product';
import ItemsInCart from '../models/itemsInCart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('./assets/data.json')
  }
}
