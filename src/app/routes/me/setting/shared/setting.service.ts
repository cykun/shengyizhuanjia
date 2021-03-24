import { LoginLog } from './../../../passport/class/login-log';
import { LocalStorageService } from './../../../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  public user: any = {};
  constructor(private localStorageService: LocalStorageService) {
    const loginLog: LoginLog = localStorageService.get('LoginLog', null);
    if (loginLog !== null) {
      const userFromLogin = this.localStorageService.get('TUser', []).find(u => u.id === loginLog.userId);
      // this.user.userFromLogin = userFromLogin;
      this.load(userFromLogin);
    }
  }

  load(userFromLogin: any) {
    const shop: any = {};
    this.user = {
      ...userFromLogin,
      ...shop
    };
  }
}
