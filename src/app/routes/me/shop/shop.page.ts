import { SettingService } from './../setting/shared/setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  public shop = {
    shopName: '',
    shortName: '',
    createDate: '',
    phone: '',
    email: '',
    owner: '',
    shopPhone: '',
    businessType: ''
  };
  constructor(private settingService: SettingService) {
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.shop = this.settingService.user;
    // this.shop.shopName = this.settingService.user.shopName;
    // this.shop.shortName = this.settingService.user.shortName;
    // this.shop.registerDate = this.settingService.user.createDate;
    // this.shop.phone = this.settingService.user.phone;
    // this.shop.email = this.settingService.user.email;
    // this.shop.owner = this.settingService.user.owner;
    // this.shop.shopPhone = this.settingService.user.shopPhone;
    // this.shop.businessType = this.settingService.user.businessType;
  }

}
