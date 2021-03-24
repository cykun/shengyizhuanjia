import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: any = window.localStorage;
  constructor() { }

  get(key: string, defaultValue: any): any {
    if (key === null || key.length === 0) {
      throw new Error('key不能为空');
    }
    let value: any = this.storage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    if (value === null && defaultValue) {
      value = defaultValue;
    }
    return value;
  }

  set(key: string, value: any) {
    if (key === null || key.length === 0) {
      throw new Error('key不能为空');
    }
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    if (key === null || key.length === 0) {
      throw new Error('key不能为空');
    }
    this.storage.removeItem(key);
  }

}
