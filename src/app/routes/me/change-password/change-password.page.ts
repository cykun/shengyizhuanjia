import { SettingService } from './../setting/shared/setting.service';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  public passwordVO = {
    old: '',
    new: '',
    confirm: ''
  };
  constructor(private toastController: ToastController, private localStorageService: LocalStorageService,
              private settingService: SettingService) { }

  ngOnInit() {
  }

  /**
   * 修改密码
   * @param form 表单
   */
  async onChangePassword(form: NgForm) {
    if (form.valid) {
      const accountList = this.localStorageService.get('loginAccount', []);
      let toast: any;
      for (const account of accountList) {
        if (account.userId === this.settingService.user.id) {
          if (account.passwordToken !== this.passwordVO.old) {
            toast = await this.toastController.create({
              message: '旧密码错误',
              duration: 3000
            });
            toast.present();
            return;
          }
          account.passwordToken = this.passwordVO.new;
        }
      }
      this.localStorageService.set('loginAccount', accountList);
      toast = await this.toastController.create({
        message: '密码修改成功',
        duration: 3000
      });
      toast.present();
    }
  }

}
