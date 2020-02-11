import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPoPage } from './list-po.page';

describe('ListPoPage', () => {
  let component: ListPoPage;
  let fixture: ComponentFixture<ListPoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
