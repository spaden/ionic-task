import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmcModalPage } from './amc-modal.page';

describe('AmcModalPage', () => {
  let component: AmcModalPage;
  let fixture: ComponentFixture<AmcModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmcModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
