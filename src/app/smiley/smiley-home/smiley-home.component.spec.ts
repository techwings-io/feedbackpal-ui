import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmileyHomeComponent } from './smiley-home.component';

describe('SmileyHomeComponent', () => {
  let component: SmileyHomeComponent;
  let fixture: ComponentFixture<SmileyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmileyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmileyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
