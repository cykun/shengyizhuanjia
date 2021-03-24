import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditShopPage } from './edit-shop.page';

describe('EditShopPage', () => {
  let component: EditShopPage;
  let fixture: ComponentFixture<EditShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
