import { LocalStorageService } from './services/local-storage.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { ConfirmDirective } from './directives/confirm.directive';
import { PhoneConfirmDirective } from './directives/phone-confirm.directive';
import { PasswordConfirmDirective } from './directives/password-confirm.directive';

@NgModule({
  declarations: [
    CopyrightComponent,
    ConfirmDirective,
    PhoneConfirmDirective,
    PasswordConfirmDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [
    LocalStorageService
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopyrightComponent,
    ConfirmDirective,
    PhoneConfirmDirective,
    PasswordConfirmDirective
  ]
})
export class SharedModule { }
