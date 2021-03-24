import { SettingService } from './shared/setting.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  public version = '';
  public phone = '';
  constructor(private localStorageService: LocalStorageService, private alertController: AlertController, private router: Router,
              private settingService: SettingService) { }

  ngOnInit() {
    const appConfig: any = this.localStorageService.get('App', {
      launched: false,
      version: '1.2.4'
    });
    this.version = appConfig.version;
    this.phone = this.settingService.user.phone;
  }

  async checkUpdate() {
    const alert = await this.alertController.create({
      header: '提示',
      message: '已经是最新版本',
      buttons: ['确认']
    });
    alert.present();
  }

  onLogout() {
    const loginLog = this.localStorageService.get('loginLog', null);
    if (loginLog !== null) {
      loginLog.logout = true;
      this.localStorageService.set('loginLog', loginLog);
    }
    this.router.navigateByUrl('passport/login');
  }

}
