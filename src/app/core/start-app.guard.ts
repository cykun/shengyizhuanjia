import { LoginLog } from './../routes/passport/class/login-log';
import { LocalStorageService } from './../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const APP_KEY = 'App';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      version: '1.2.4',
      mobile: '13695932659',
      launched: false
    });
    if (appConfig.launched === false) {
      appConfig.launched = true;
      this.localStorageService.set(APP_KEY, appConfig);
      this.router.navigateByUrl('guide');
      return false;
    } else {
      const loginLog: LoginLog = this.localStorageService.get('LoginLog', null);
      // 没有登录过或者登录时间已过期
      if (loginLog === null || loginLog.logout || loginLog.deadDate < Date.now()) {
        this.router.navigateByUrl('passport/login');
        return false;
      } else {
        // 重置登录时间
        const curDate = Date.now();
        loginLog.loginDate = curDate;
        loginLog.deadDate = curDate + 5 * 86400 * 1000;
        this.localStorageService.set('LoginLog', loginLog);
        // this.router.navigateByUrl('tabs');
      }
      return true;
    }
  }
}
