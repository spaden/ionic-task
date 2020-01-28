import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagePmPage } from './manage-pm.page';

describe('ManagePmPage', () => {
  let component: ManagePmPage;
  let fixture: ComponentFixture<ManagePmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
