import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchedulePmModalPage } from './schedule-pm-modal.page';

describe('SchedulePmModalPage', () => {
  let component: SchedulePmModalPage;
  let fixture: ComponentFixture<SchedulePmModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePmModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulePmModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
