import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { PassportService } from './../shared/passport.service';
import { AliyunSmsService } from './../shared/aliyun-sms.service';
import { AuthenticationCodeService } from './../shared/authentication-code.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, ToastController } from '@ionic/angular';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { Signup } from '../class/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public slideIndex = 0;
  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides;

  public signup: Signup = {
    phone: '',
    email: '',
    shopName: '',
    password: '',
    confirmPassword: '',
    code: ''
  };
  public submited = false;
  private randomCode = '1234';
  public verifyCode = {
    verifyCodeTips: '获取验证码',
    countdown: 60,
    disable: false
  };
  constructor(private authenticationCodeService: AuthenticationCodeService, private aliyunSmsService: AliyunSmsService,
              private passportService: PassportService, public toastController: ToastController, private router: Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.signupSlides.lockSwipes(true);
  }

  onNext() {
    this.signupSlides.lockSwipes(false);
    this.signupSlides.slideNext();
    this.slideIndex++;
    this.signupSlides.lockSwipes(true);
  }

  onPrevious() {
    this.signupSlides.lockSwipes(false);
    this.signupSlides.slidePrev();
    this.slideIndex--;
    this.signupSlides.lockSwipes(true);
  }

  async onSubmitPhone(form: NgForm) {
    this.submited = true;
    if (form.valid) {
      // if (this.passportService.isUniquePhone(this.signup.phone)) {
      //   this.onNext();
      // } else {
      //   const toast = await this.toastController.create({
      //     message: '手机号已存在',
      //     duration: 3000
      //   });
      //   toast.present();
      // }
      this.onNext();
    }
  }

  onSendSMS() {
    this.randomCode = this.authenticationCodeService.createCode(4);
    // console.log(this.randomCode);
    this.aliyunSmsService.sendSms(this.signup.phone, this.randomCode);
    this.countDown();
  }

  countDown() {
    const intervalSubscribe = interval(1000)
      .pipe(take(60))
      .subscribe({
        next: (value: number) => {
          this.verifyCode.disable = true;
          this.verifyCode.verifyCodeTips = `重新获取(${this.verifyCode.countdown - value}s)`;
        },
        error: null,
        complete: () => {
          this.verifyCode.verifyCodeTips = '发送验证码';
          this.verifyCode.disable = false;
          intervalSubscribe.unsubscribe();
        }
      });
  }

  async onValidateCode(form: NgForm) {
    if (form.valid) {
      const inputCode = this.signup.code;
      if (this.authenticationCodeService.validate(inputCode)) {
        console.log('验证码正确');
        this.onNext();
      } else {
        console.log('验证码错误或者验证码失效');
        const toast = await this.toastController.create({
          message: '验证码错误或者验证码失效',
          duration: 3000
        });
        toast.present();
      }
    }
  }

  async onSignupInformation(form: NgForm) {
    if (form.valid) {
      const toast = await this.toastController.create({
        duration: 3000
      });
      if (this.signup.password !== this.signup.confirmPassword) {
        toast.message = '密码与确认密码不一致';
        toast.present();
        console.log('密码与确认密码不一致');
        return;
      }
      // if (!this.passportService.isUniqueEmail(this.signup.email)) {
      //   toast.message = '邮箱已存在';
      //   toast.present();
      //   console.log('邮箱已存在');
      //   return;
      // }
      this.passportService.signup(this.signup).then(async ajaxResult => {
        if (ajaxResult.success) {
          this.onNext();
        } else {
          toast.message = ajaxResult.error.message;
          toast.present();
        }
      });
    }
  }

  gotologin() {
    this.passportService.login(this.signup.phone, this.signup.password).then((ajaxResult) => {
      const curDate = Date.now();
      const loginLog = {
          userId: ajaxResult.result.userId,
          loginDate: curDate,
          deadDate: curDate + 5 * 86400 * 1000,
          identifier: ajaxResult.result.identifier,
          logout: false
        };
      this.localStorageService.set('LoginLog', loginLog);
      this.router.navigateByUrl('tabs');
    });
  }

}
