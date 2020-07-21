import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoPage } from './po.page';

describe('PoPage', () => {
  let component: PoPage;
  let fixture: ComponentFixture<PoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
