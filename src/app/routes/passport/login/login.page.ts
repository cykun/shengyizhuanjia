import { LoginAccount } from './../class/login-account';
import { LoginLog } from './../class/login-log';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PassportService } from './../shared/passport.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: string;
  public password: string;
  constructor(private passportService: PassportService, private router: Router, public alertController: AlertController,
              private toastController: ToastController, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const loginLog: LoginLog = this.localStorageService.get('LoginLog', null);
    if (loginLog != null) {
      this.username = loginLog.identifier;
      const loginAccountList: Array<LoginAccount> = this.localStorageService.get('TAccount', []);
      this.password = loginAccountList.find(a => a.identifier === loginLog.identifier).passwordToken;
    }
  }

  async onLogin(form: NgForm) {
    let toast: any;
    if (form.invalid) {
      toast = await this.toastController.create({
        duration: 3000
      });
      if (form.controls.username.invalid) {
        toast.message = '请输入您的手机号码或者邮箱';
        toast.present();
      } else if (form.controls.password.invalid) {
        toast.message = '请输入您的登录密码';
        toast.present();
      }
    } else {
      this.passportService.login(this.username, this.password).then((ajaxResult) => {
        if (ajaxResult.success) {
          const curDate = Date.now();
          const loginLog: LoginLog = {
            userId: ajaxResult.result.userId,
            loginDate: curDate,
            deadDate: curDate + 5 * 86400 * 1000,
            identifier: ajaxResult.result.identifier,
            logout: false
          };
          this.localStorageService.set('LoginLog', loginLog);
          this.router.navigateByUrl('tabs');
        } else {
          this.alertController.create({
            header: '警告',
            buttons: ['确定']
          }).then((alert) => {
            alert.message = ajaxResult.error.message;
            alert.present();
          });
        }
      });
    }
  }

  onForgotPassword() {
    this.router.navigateByUrl('passport/forgot-password');
  }

}
