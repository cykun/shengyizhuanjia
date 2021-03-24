import { LoginPage } from './login/login.page';
import { AliyunSmsService } from './shared/aliyun-sms.service';
import { AuthenticationCodeService } from './shared/authentication-code.service';
import { SignupPage } from './signup/signup.page';
import { NgModule } from '@angular/core';

import { PassportRoutingModule } from './passport-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';

@NgModule({
  declarations: [
    SignupPage,
    LoginPage,
    ForgotPasswordPage
  ],
  imports: [
    SharedModule,
    PassportRoutingModule
  ],
  providers: [
    AuthenticationCodeService,
    AliyunSmsService
  ]
})
export class PassportModule { }
