import { CategoryNameEditPage } from './../category-name-edit/category-name-edit.page';
import { Category } from './../class/category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../shared/category.service';
import { AlertController, IonItemSliding, ModalController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  public id: number;
  public category: Category = {
    id: 0,
    name: '151515',
    children: []
  };
  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService,
              private modalCtrl: ModalController, private alertCtrl: AlertController,
              private navController: NavController, private toastController: ToastController) {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.categoryService.get(this.id).then(ajaxResult => {
      this.category = ajaxResult.result;
    });
  }

  /**
   * 展示模态框
   */
  private async presentModal(name: string) {
    const modal = await this.modalCtrl.create({
      component: CategoryNameEditPage,
      componentProps: { value: name }
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    const { data } = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
    }
    this.categoryService.update(this.category);
    const toast = await this.toastController.create({
      message: '修改成功',
      duration: 3000
    });
    toast.present();
  }

  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const { data } = await this.presentModal(subCategory.name);
    if (data) {
      subCategory.name = data;
    }
    this.categoryService.update(this.category);
    const toast = await this.toastController.create({
      message: '修改成功',
      duration: 3000
    });
    toast.present();
  }

  ngOnInit() {
  }

  async onDelete(item: IonItemSliding, subId?: number) {
    const alert = await this.alertCtrl.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            item.close();
          }
        }, {
          text: '确认',
          handler: () => {
            if (subId != null) { // 删除商品子分类
              item.close();
              this.categoryService.deleteSubCategoryById(this.category, subId);
              this.category.children = this.category.children.filter(c => c.id !== subId);
            } else if (this.category.children.length === 0) { // 删除商品分类
              item.close();
              this.categoryService.deleteCategoryById(this.category.id);
              this.navController.pop();
            } else {
              item.close();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

}
