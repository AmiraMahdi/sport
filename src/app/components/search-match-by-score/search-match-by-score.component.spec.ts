import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMatchByScoreComponent } from './search-match-by-score.component';

describe('SearchMatchByScoreComponent', () => {
  let component: SearchMatchByScoreComponent;
  let fixture: ComponentFixture<SearchMatchByScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMatchByScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMatchByScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
