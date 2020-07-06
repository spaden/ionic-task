import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateAmcPage } from './create-amc.page';

describe('CreateAmcPage', () => {
  let component: CreateAmcPage;
  let fixture: ComponentFixture<CreateAmcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAmcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAmcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
