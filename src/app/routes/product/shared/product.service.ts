import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { AjaxResult } from 'src/app/shared/class/ajax-result';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 添加新商品
   */
  async insert(input: Product): Promise<AjaxResult> {
    const products: Array<Product> = this.localStorageService.get('product', []);
    let productId = 1;
    if (products.length !== 0) {
      productId = products[products.length - 1].id + 1;
    }
    input.id = productId;
    products.push(input);
    this.localStorageService.set('product', products);
    return new AjaxResult(true, null);
  }
}
