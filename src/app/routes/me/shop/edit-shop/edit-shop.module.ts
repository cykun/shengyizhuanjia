import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';

import { EditShopPageRoutingModule } from './edit-shop-routing.module';

import { EditShopPage } from './edit-shop.page';

@NgModule({
  imports: [
    SharedModule,
    EditShopPageRoutingModule
  ],
  declarations: [EditShopPage]
})
export class EditShopPageModule {}
