import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmileyCardComponent } from './smiley-card.component';

describe('SmileyCardComponent', () => {
  let component: SmileyCardComponent;
  let fixture: ComponentFixture<SmileyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmileyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmileyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
