import { ProductAddPage } from './product-add/product-add.page';
import { CategoryEditPage } from './category/category-edit/category-edit.page';
import { CategoryAddPage } from './category/category-add/category-add.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListPage } from './category/category-list/category-list.page';

const routes: Routes = [
  {
    path: 'category/list',
    component: CategoryListPage
  },
  {
    path: 'category/add',
    component: CategoryAddPage
  },
  {
    path: 'category/edit/:id',
    component: CategoryEditPage
  },
  {
    path: 'add',
    component: ProductAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
