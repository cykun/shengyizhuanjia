import { ToastController, AlertController, NavController } from '@ionic/angular';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../class/category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {

  public id: number;
  public name = '';
  public children: Array<Category> = [];
  public increaseId = 0;
  public category: Category = {
    id: 0,
    name: '',
    children: []
  };
  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService,
              private toastController: ToastController, private alertController: AlertController,
              private navController: NavController) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.id = Number(queryParams.id);
      this.name = queryParams.name;
    });
    const newChildren: Category = {
      id: this.increaseId++,
      name: '',
      children: []
    };
    this.children.push(newChildren);
  }

  ngOnInit() {
  }

  onSave() {
    if (this.id === 0) {
      this.onSavaAddCategory();
    } else {
      this.onSavaAddSubCategory();
    }
  }

  onAddSubCategory() {
    const newChildren: Category = {
      id: this.increaseId++,
      name: '',
      children: []
    };
    this.children.push(newChildren);
  }

  async onSavaAddCategory() {
    this.category.children = this.children;
    if (this.categoryService.insert(this.category)) {
      const alert = await this.alertController.create({
        header: '提示',
        message: '新增成功',
        buttons: ['确定']
      });
      alert.present();
      this.navController.pop();
    } else {
      const toast = await this.toastController.create({
        message: '请注意商品大类或者小类不能重复1！',
        duration: 3000
      });
      toast.present();
    }
  }
  async onSavaAddSubCategory() {
    this.category.children = this.children;
    this.category.id = this.id;
    const data = await this.categoryService.insertSubCategory(this.category);
    if (data.success) {
      const alert = await this.alertController.create({
        header: '提示',
        message: '新增成功',
        buttons: ['确定']
      });
      alert.present();
      this.navController.pop();
    } else {
      const toast = await this.toastController.create({
        message: '请注意商品大类或者小类不能重复2！',
        duration: 3000
      });
      toast.present();
    }
  }
}
