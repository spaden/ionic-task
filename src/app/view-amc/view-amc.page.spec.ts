import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAmcPage } from './view-amc.page';

describe('ViewAmcPage', () => {
  let component: ViewAmcPage;
  let fixture: ComponentFixture<ViewAmcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAmcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAmcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
