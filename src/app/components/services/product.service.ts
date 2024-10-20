import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import Product from '../models/product';
import ItemsInCart from '../models/itemsInCart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
    {option: "Option 10", value: 10}
  ]

  constructor(
    private http: HttpClient
  ) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('./assets/data.json').pipe(
      catchError((error) => {
        console.error('Error fetching product list', error);
        return of([]);
      })
    );
  }
}
