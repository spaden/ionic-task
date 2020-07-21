import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AmcPmPage } from './amc-pm.page';

describe('AmcPmPage', () => {
  let component: AmcPmPage;
  let fixture: ComponentFixture<AmcPmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcPmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AmcPmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
