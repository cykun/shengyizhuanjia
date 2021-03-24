import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AliyunSmsService {
  private config: Config;
  constructor(private http: HttpClient) {
    this.config = {
      accessKeyId: '',
      accessKeySecret: '',
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
      opts: {}
    };
  }

  /**
   * 发送短信验证码
   * @param phone 手机号
   * @param code 验证码
   */
  public sendSms(phone: string, code: string) {
    const params = {
      RegionId: 'cn-hangzhou',
      PhoneNumbers: phone,
      SignName: '',
      TemplateCode: '',
      TemplateParam: '{"code":"' + code + '"}'
    };
    this.request('SendSms', params);
  }

  public request(action, params = {}) {
    action = firstLetterUpper(action);
    params = formatParams(params);
    const defaults = this.buildParams();
    params = Object.assign({ Action: action }, defaults, params);

    const method = 'GET'.toUpperCase();
    const normalized = normalize(params);
    const canonicalized = canonicalize(normalized);
    const stringToSign = `${method}&${encode('/')}&${encode(canonicalized)}`;
    const key = this.config.accessKeySecret + '&';

    // const crypto = require('crypto');
    // const createHmac = require('create-hmac')
    const HmacSha1 = require('crypto-js/hmac-sha1');
    const Base64 = require('crypto-js/enc-base64');
    // const signature = hmacSHA1('sha1', key).update(stringToSign).digest('base64');
    const signature = Base64.stringify((HmacSha1(stringToSign, key)));
    normalized.push(['Signature', encode(signature)]);

    const url = `${this.config.endpoint}/?${canonicalize(normalized)}`;
    this.http.get(url).toPromise().then(data => console.log(data)).catch(err => console.error(err));
  }

  private buildParams() {
    const defaultParams = {
      Format: 'JSON',
      SignatureMethod: 'HMAC-SHA1',
      SignatureNonce: makeNonce(),
      SignatureVersion: '1.0',
      Timestamp: timestamp(),
      AccessKeyId: this.config.accessKeyId,
      Version: this.config.apiVersion,
    };
    // if (this.securityToken) {
    //   defaultParams.SecurityToken = this.securityToken;
    // }
    return defaultParams;
  }
}

interface Config {
  endpoint: string;
  apiVersion: string;
  accessKeyId: string;
  accessKeySecret: string;
  codes?: (string | number)[];
  opts?: object;
}

function firstLetterUpper(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function formatParams(params) {
  const keys = Object.keys(params);
  const newParams = {};
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    newParams[firstLetterUpper(key)] = params[key];
  }
  return newParams;
}

function timestamp() {
  return moment(new Date().getTime() - 3600 * 1000 * 8).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
}

function encode(str) {
  const result = encodeURIComponent(str);

  return result.replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

function replaceRepeatList(target, key, repeat) {
  for (let i = 0; i < repeat.length; i++) {
    const item = repeat[i];

    if (item && typeof item === 'object') {
      const keys = Object.keys(item);
      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < keys.length; j++) {
        target[`${key}.${i + 1}.${keys[j]}`] = item[keys[j]];
      }
    } else {
      target[`${key}.${i + 1}`] = item;
    }
  }
}

function flatParams(params) {
  const target = {};
  const keys = Object.keys(params);
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = params[key];
    if (Array.isArray(value)) {
      replaceRepeatList(target, key, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

function normalize(params) {
  const list = [];
  const flated = flatParams(params);
  const keys = Object.keys(flated).sort();
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = flated[key];
    list.push([encode(key), encode(value)]);
  }
  return list;
}

function canonicalize(normalized) {
  const fields = [];
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < normalized.length; i++) {
    const [key, value] = normalized[i];
    fields.push(key + '=' + value);
  }
  return fields.join('&');
}

function makeNonce() {
  // let counter = 0;
  // let last;
  // const machine = hostname;
  // const pid = 0;
  // return function () {
  //   var val = Math.floor(Math.random() * 1000000000000);
  //   if (val === last) {
  //     counter++;
  //   } else {
  //     counter = 0;
  //   }

  //   last = val;

  //   var uid = `${machine}${pid}${val}${counter}`;
  // return exports.md5(uid, 'hex');
  return Date.now();
}

function hostname() {
  if (typeof location !== 'undefined') {
    return location.hostname;
  }
  else {
    return '';
  }
}
