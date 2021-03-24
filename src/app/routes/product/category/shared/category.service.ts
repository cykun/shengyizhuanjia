import { ActiveCategory } from './../class/active-category';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Category } from '../class/category';
import { CATEGORIES } from '../class/mock.categories';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categorySubject = new Subject<ActiveCategory>();
  constructor(private localStorageService: LocalStorageService) { }

  async getAll(): Promise<AjaxResult> {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    return new AjaxResult(true, categories);
  }

  insert(category: Category) {
    if (this.isUniqueName(category)) {
      this.getAll().then((data) => {
        const categories = data.result;
        category.id = Number(categories[categories.length - 1].id) + 1;
        categories.push(category);
        this.localStorageService.set('Category', categories);
      });
      return true;
    } else {
      return false;
    }
  }

  isUniqueName(category: Category): boolean {
    const x = [];
    for (const c of category.children) {
      x.push(c.name);
    }
    x.sort();
    for (let i = 1; i < x.length; i++) {
      if (x[i] === x[i - 1]) {
        return false;
      }
    }
    return true;
  }

  async insertSubCategory(category: Category): Promise<AjaxResult> {
    if (this.isUniqueName(category)) {
      const data = await this.get(category.id);
      if (data.success) {
        const cat = data.result;
        let maxId = category.id * 100 + 1;
        for (const c of cat.children) {
          if (c.id > maxId) {
            maxId = c.id;
          }
        }
        for (const c of category.children) {
          c.id = maxId + 1;
          maxId = c.id;
          cat.children.push(c);
        }
        if (this.isUniqueName(cat)) {
          this.update(cat);
          return new AjaxResult(true, null);
        }
      }
    }
    return new AjaxResult(false, null);
  }

  async get(id: number): Promise<AjaxResult> {
    const cat = this.localStorageService.get('Category', CATEGORIES);
    for (const c of cat) {
      if (id === c.id) {
        return new AjaxResult(true, c);
      }
    }
    return new AjaxResult(false, null);
  }

  async update(category: Category): Promise<AjaxResult> {
    const cat = this.localStorageService.get('Category', CATEGORIES);
    for (const c of cat) {
      if (category.id === c.id) {
        c.name = category.name;
        c.children = category.children;
        this.localStorageService.set('Category', cat);
        return new AjaxResult(true, null);
      }
    }
    return new AjaxResult(false, null);
  }

  findCategoryIndexByName(name: string): number {
    const cg = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].name === name) {
        return i;
      }
    }
    return -1;
  }

  deleteSubCategoryById(category: Category, id: number): boolean {
    if (category == null) {
      return false;
    }
    for (let i = 0; i < category.children.length; i++) {
      if (category.children[i].id === id) {
        const index = this.findCategoryIndexByName(category.name);
        const tmp = this.localStorageService.get('Category', CATEGORIES);
        tmp[index].children.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }

  /**
   * 通过id删除商品分类
   */
  deleteCategoryById(id: number): boolean {
    const tmp = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].id === id) {
        tmp.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }

  watchCategory(): Observable<ActiveCategory> {
    return this.categorySubject.asObservable();
  }
}
