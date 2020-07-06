import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageAmcPage } from './manage-amc.page';

describe('ManageAmcPage', () => {
  let component: ManageAmcPage;
  let fixture: ComponentFixture<ManageAmcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAmcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageAmcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
