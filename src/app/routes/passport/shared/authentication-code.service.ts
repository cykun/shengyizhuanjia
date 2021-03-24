import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationCodeService {

  // 用于保存验证码
  private code: string;
  // 存放验证码的过期时间
  private deadline: number;
  constructor() {
    this.code = '';
  }

  /**
   * 生成验证码
   *
   * @param count [count=4] 验证码长度
   * @param timeout [timeout=10] 验证码有效时间
   * @return 验证码
   */
  createCode(count: number = 4, timeout: number = 10): string {
    this.code = '';
    // 10分钟内有效
    this.deadline = Date.now() + timeout * 60 * 1000;
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 10);
      this.code += num.toString();
    }
    return this.code;
  }

  /**
   * 验证用户输入的短信验证码是否一致，是否过期
   * @param value 验证码
   * @returns true:验证码正确确有效，false: 验证码错误或者失效
   */
  validate(value: string): boolean {
    const now = Date.now();
    return value === this.code && now < this.deadline;
  }
}
