import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingpairsComponent } from './matchingpairs.component';

describe('MatchingpairsComponent', () => {
  let component: MatchingpairsComponent;
  let fixture: ComponentFixture<MatchingpairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchingpairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingpairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
