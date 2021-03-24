import { ProductAddPage } from './product-add/product-add.page';
import { CategoryNameEditPage } from './category/category-name-edit/category-name-edit.page';
import { CategoryEditPage } from './category/category-edit/category-edit.page';
import { CategoryAddPage } from './category/category-add/category-add.page';
import { SharedModule } from './../../shared/shared.module';

import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { CategoryListPage } from './category/category-list/category-list.page';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [
    CategoryListPage,
    CategoryAddPage,
    CategoryEditPage,
    CategoryNameEditPage,
    ProductAddPage
  ],
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  providers: [
    Camera,
    ImagePicker,
    BarcodeScanner
  ]
})
export class ProductModule { }
