import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SchedulePmPage } from './schedule-pm.page';

describe('SchedulePmPage', () => {
  let component: SchedulePmPage;
  let fixture: ComponentFixture<SchedulePmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulePmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
