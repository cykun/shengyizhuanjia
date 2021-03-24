import { NgModule } from '@angular/core';

import { GuidePageRoutingModule } from './guide-routing.module';

import { GuidePage } from './guide.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    GuidePageRoutingModule
  ],
  declarations: [GuidePage]
})
export class GuidePageModule {}
