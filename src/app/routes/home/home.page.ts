import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public sales = [
    { title: '今日', content: '比昨日', current: this.generateRandom(), previous: this.generateRandom() },
    { title: '七日', content: '比同期', current: this.generateRandom(), previous: this.generateRandom() },
    { title: '本月', content: '比同期', current: this.generateRandom(), previous: this.generateRandom() }
  ];

  public quicks = [
    [
      { href: '/product/add', name: 'add_salse', text: '新增商品', disable: false },
      { href: '/home', name: 'add_user', text: '新增会员', disable: false },
      { href: '/home', name: 'sales_account', text: '收银记账', disable: false },
      { href: '/home', name: 'a_note', text: '支出管理', disable: false }
    ],
    [
      { href: '/productList', name: 'sales_management', text: '商品管理', disable: false },
      { href: '/home', name: 'user_management', text: '会员管理', disable: false },
      { href: '/home', name: 'shop_management', text: '查询销售', disable: false },
      { href: '/home', name: 'analysis', text: '智能分析', disable: false }
    ],
    [
      { href: '/supplierList', name: 'gongying_more', text: '供应商管理', disable: false },
      { href: '/home', name: 'guandan_more', text: '挂单', disable: false },
      { href: '/home', name: 'image_addsales', text: '高级功能', disable: false },
      { disable: true }
    ]
  ];
  constructor() { }

  ngOnInit() {
  }

  public minus(current: number, previous: number): number {
    const result = current - previous;
    if (result > 0) {
      return 1;
    } else if (result === 0) {
      return 0;
    } else {
      return -1;
    }
  }

  private generateRandom() {
    const precision = 100; // 2个小数
    const randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);
    return randomnum;
  }
}
