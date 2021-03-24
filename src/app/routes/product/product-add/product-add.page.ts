import { Router } from '@angular/router';
import { ProductService } from './../shared/product.service';
import { CategoryService } from './../category/shared/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../interface/product';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.page.html',
  styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit, OnDestroy {
  private subscription: Subscription;
  public product: Product;
  constructor(private categoryService: CategoryService, private actionSheetCtrl: ActionSheetController,
              private productService: ProductService, private alertController: AlertController, private router: Router,
              private camera: Camera,  private imagePicker: ImagePicker, private barcodeScanner: BarcodeScanner) {
    this.product = this.initProduct();
    this.product.categoryName = '默认分类';
    this.subscription = this.categoryService.watchCategory().subscribe(activeCategory => {
      this.product.categoryId = activeCategory.id;
      this.product.categoryName = activeCategory.name;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        const alert = await this.alertController.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct) {
          this.product = this.initProduct();
          this.product.categoryName = '默认分类';
          this.product.supplier.name = '输入商品供应商';
        } else {
          // this.router.navigateByUrl('/productList');
        }
      } else {
        const alert = await this.alertController.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }

  /**
   * 拍照
   */
  onCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  /**
   * 从相册中选取
   */
  onImagePicker() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 3,
      quality: 50,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then(async (results) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        const base64Image = 'data:image/jpeg;base64,' + results[i];
        this.product.images.push(base64Image);
      }
      // const alert = await this.alertController.create();
      // alert.message = '成功';
      // alert.present();
      // for (let i = 0; i < results.length; i++) {
      //   console.log('Image URI: ' + results[i]);
      //   this.product.images.push(results[i]);
      // }
    }, async (err) => {
      const alert = await this.alertController.create();
      alert.message = '失败：' + err;
      alert.present();
    });
  }

  /**
   * 上传图片
   */
  async onPresentActiveSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('进入相机');
            this.onCamera();
          }
        }, {
          text: '相册',
          handler: () => {
            console.log('进入相册');
            this.onImagePicker();
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

  /**
   * 本地没有供应商数据，输入供应商
   */
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: '新增供货商',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '输入供货商名称'
        },
        {
          name: 'phone',
          type: 'number',
          placeholder: '输入供货商电话'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '保存',
          handler: (data) => {
            this.product.supplier = data;
            // this.zone.run(() => {
            //   supplier.name = data.name;
            //   supplier.phone = data.phone;
            // });
            // console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  onClickSupplier() {
    this.presentAlertPrompt();
  }

  /**
   * 初始化商品
   */
  initProduct(): Product {
    return {
      id: 0,
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '', // 条码
      images: [],
      price: null, // 售价
      purchasePrice: null, // 进价
      inventory: null, // 库存
      supplier: { name: '' }, // 供货商
      standard: '', // 规格
      remark: ''
    };
  }

  onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.product.barcode = barcodeData.text;
    }).catch(async err => {
      const alert = await this.alertController.create();
      alert.message = '出错啦：' + err;
      alert.present();
    });
  }

  gotoCategyList() {
    this.router.navigateByUrl('product/category/list');
  }
}
