import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllAmcModalPage } from './all-amc-modal.page';

describe('AllAmcModalPage', () => {
  let component: AllAmcModalPage;
  let fixture: ComponentFixture<AllAmcModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAmcModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllAmcModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
