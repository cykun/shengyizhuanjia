import { SettingService } from './setting/shared/setting.service';
import { Router } from '@angular/router';
import { User } from './../passport/class/user';
import { LoginLog } from './../passport/class/login-log';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  public appPages = [
    { title: '开店论坛', url: '/home', icon: 'chatbox-outline' },
    { title: '手机橱窗', url: '/home', icon: 'create-outline' },
    { title: '邀请有礼', url: '/home', icon: 'git-merge-outline' },
    { title: '资金账户', url: '/home', icon: 'cash-outline' },
    { title: '反馈建议', url: '/home', icon: 'information-outline' },
    { title: '帮助中心', url: '/home', icon: 'help-circle-outline' },
  ];

  public shopName = '';
  public phone = '';
  constructor(private localStorageService: LocalStorageService, private router: Router, private settingService: SettingService) { }

  ngOnInit() {
    // const loginLog: LoginLog = this.localStorageService.get('loginLog', null);
    // if (loginLog !== null) {
    //   const userId = loginLog.userId;
    //   const user: User = this.localStorageService.get('user', []).find(u => u.id === userId);
    //   this.phone = user.phone;
    //   this.shopName = user.shopName;
    // }
  }

  ionViewWillEnter() {
    this.phone = this.settingService.user.phone;
    this.shopName = this.settingService.user.shopName;
  }

  gotoSetting() {
    this.router.navigateByUrl('tabs/me/setting');
  }

}
