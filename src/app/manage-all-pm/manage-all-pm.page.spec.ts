import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageAllPmPage } from './manage-all-pm.page';

describe('ManageAllPmPage', () => {
  let component: ManageAllPmPage;
  let fixture: ComponentFixture<ManageAllPmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAllPmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageAllPmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
