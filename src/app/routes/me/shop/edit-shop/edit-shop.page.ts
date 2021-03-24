import { SettingService } from './../../setting/shared/setting.service';
import { ToastController, NavController } from '@ionic/angular';
import { LocalStorageService } from './../../../../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.page.html',
  styleUrls: ['./edit-shop.page.scss'],
})
export class EditShopPage implements OnInit {

  public title: string;
  public property: string;
  public value: string;
  public shop: any;
  constructor(private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService,
              private toastController: ToastController, private settingService: SettingService, private navController: NavController) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.title = queryParams.title;
      this.property = queryParams.property;
    });
  }

  ngOnInit() {
  }

  async save() {
    this.settingService.user[this.property] = this.value;
    const loginLog = this.localStorageService.get('LoginLog', null);
    loginLog[this.property] = this.value;
    this.localStorageService.set('LoginLog', loginLog);
    const userList = this.localStorageService.get('TUser', []);
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id === this.settingService.user.id) {
        userList[i] = this.settingService.user;
        this.localStorageService.set('TUser', userList);
        break;
      }
    }
    this.value = '';
    const toast = await this.toastController.create({
      message: this.title + '修改成功',
      duration: 3000
    });
    toast.present();
    this.navController.pop();
  }
}
