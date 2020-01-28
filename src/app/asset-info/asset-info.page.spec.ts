import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetInfoPage } from './asset-info.page';

describe('AssetInfoPage', () => {
  let component: AssetInfoPage;
  let fixture: ComponentFixture<AssetInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
