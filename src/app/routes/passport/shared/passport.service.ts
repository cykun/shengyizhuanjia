import { AccountType, LoginAccount } from './../class/login-account';
import { User } from './../class/user';
import { AjaxResult } from './../../../shared/class/ajax-result';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { Signup } from '../class/signup';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private localStorageService: LocalStorageService) { }

  /**
   * 新用户注册
   * @param signup 注册信息
   * @returns 注册是否成功
   */
  async signup(signup: Signup): Promise<AjaxResult> {
    if (!this.isUniquePhone(signup.phone)) {
      return new AjaxResult(false, null, {
        message: '手机号已存在'
      });
    }
    if (!this.isUniqueEmail(signup.email)) {
      return new AjaxResult(false, null, {
        message: '邮箱已存在'
      });
    }
    const userList: Array<User> = this.localStorageService.get('TUser', []);
    let idGeneate = 1;
    if (userList.length !== 0) {
      idGeneate = userList.map((u) => u.id).pop() + 1;
    }
    const user: User = {
      id: idGeneate,
      shopName: signup.shopName,
      phone: signup.phone,
      email: signup.email,
      createDate: Date.now().toString(),
      shortName: '',
      owner: '',
      shopPhone: '',
      businessType: ''
    };
    userList.push(user);
    this.localStorageService.set('TUser', userList);
    let accountLoginId = 1;
    const accountLoginList: Array<LoginAccount> = this.localStorageService.get('TAccount', []);
    if (accountLoginList.length !== 0) {
      accountLoginId = accountLoginList.map(a => a.id).pop() + 1;
    }
    const phoneLoginAccount: LoginAccount = {
      id: accountLoginId,
      userId: idGeneate,
      type: AccountType.phone,
      thirdParty: 0,
      identifier: signup.phone,
      passwordToken: signup.password
    };
    const emailLoginAccount: LoginAccount = {
      id: accountLoginId + 1,
      userId: idGeneate,
      type: AccountType.email,
      thirdParty: 0,
      identifier: signup.email,
      passwordToken: signup.password
    };
    accountLoginList.push(phoneLoginAccount, emailLoginAccount);
    this.localStorageService.set('TAccount', accountLoginList);
    return new AjaxResult(true, null);
  }

  async login(phoneOrEmail: string, password: string): Promise<AjaxResult> {
    const loginAccountList: Array<LoginAccount> = this.localStorageService.get('TAccount', []);
    const currentUser = loginAccountList.find(a => a.identifier === phoneOrEmail);
    if (currentUser === undefined) {
      return new AjaxResult(false, null, {
        message: '未存在此账户'
      });
    }
    if (currentUser.passwordToken !== password) {
      return new AjaxResult(false, null, {
        message: '密码错误'
      });
    }
    // const curDate = Date.now();
    // const loginLog: LoginLog = {
    //   userId: currentUser.userId,
    //   loginDate: curDate,
    //   deadDate: curDate + 6 * 86400 * 1000,
    //   identifier: currentUser.identifier
    // };
    // this.localStorageService.set('loginLog', loginLog);
    currentUser.passwordToken = '';
    return new AjaxResult(true, currentUser);
  }

  /**
   * 判断手机号是否已在 localstorage 存在
   * @param phone 11位手机号
   * @returns true:手机号不存在，false:手机号存在
   */
  isUniquePhone(phone: string): boolean {
    const userList: Array<User> = this.localStorageService.get('TUser', []);
    return userList.filter(u => u.phone === phone).length === 0;
  }

  /**
   * 判断邮箱是否已在 localstorage 存在
   * @param email 邮箱
   * @returns true:邮箱不存在，false:邮箱存在
   */
  isUniqueEmail(email: string): boolean {
    const userList: Array<User> = this.localStorageService.get('TUser', []);
    return userList.filter(u => u.email === email).length === 0;
  }
}
