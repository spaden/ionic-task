import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManagePoPage } from './manage-po.page';

describe('ManagePoPage', () => {
  let component: ManagePoPage;
  let fixture: ComponentFixture<ManagePoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
