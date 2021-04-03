import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingcardsComponent } from './matchingcards.component';

describe('MatchingcardsComponent', () => {
  let component: MatchingcardsComponent;
  let fixture: ComponentFixture<MatchingcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchingcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
