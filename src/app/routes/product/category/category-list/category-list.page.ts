import { ActiveCategory } from './../class/active-category';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Category } from '../class/category';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {

  public activeCategoryIndex = 0;
  public categories: Array<Category> = [];
  public activeCategory: Category = {
    id: 0,
    name: '',
    children: []
  };
  public activeSubCategory: ActiveCategory;
  constructor(private categoryService: CategoryService, private actionSheetCtrl: ActionSheetController,
              private navController: NavController, private router: Router) { }

  ionViewWillEnter() {
    this.categoryService.getAll().then((data) => {
      this.categories = data.result;
      if (this.categories) {
        if (this.activeCategoryIndex >= this.categories.length) {
          this.activeCategoryIndex = 0;
        }
        this.activeCategory = this.categories[this.activeCategoryIndex];
      }
    });
  }

  ngOnInit() {
  }

  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            this.router.navigateByUrl('product/category/add?id=' + this.activeCategory.id + '&name=' + this.activeCategory.name);
          }
        }, {
          text: '编辑分类',
          handler: () => {
            this.router.navigate(['product/category/edit', this.activeCategory.id]);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }

  onSelectCategory(id: number) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
        this.activeCategory = this.categories[i];
        this.activeCategoryIndex = i;
        break;
      }
    }
  }

  onSelectSubCategory(category: Category) {
    this.activeSubCategory = {
      id: category.id,
      name: category.name
    };
    this.categoryService.categorySubject.next(this.activeSubCategory);
    this.navController.pop();
  }
}
