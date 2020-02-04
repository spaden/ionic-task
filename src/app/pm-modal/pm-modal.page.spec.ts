import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PmModalPage } from './pm-modal.page';

describe('PmModalPage', () => {
  let component: PmModalPage;
  let fixture: ComponentFixture<PmModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PmModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
