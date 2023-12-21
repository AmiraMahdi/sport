import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupEventComponent } from './cup-event.component';

describe('CupEventComponent', () => {
  let component: CupEventComponent;
  let fixture: ComponentFixture<CupEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
