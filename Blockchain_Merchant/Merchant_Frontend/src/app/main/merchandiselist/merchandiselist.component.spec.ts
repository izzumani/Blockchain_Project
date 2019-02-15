import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiselistComponent } from './merchandiselist.component';

describe('MerchandiselistComponent', () => {
  let component: MerchandiselistComponent;
  let fixture: ComponentFixture<MerchandiselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
