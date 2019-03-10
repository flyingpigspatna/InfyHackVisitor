import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJoineeComponent } from './new-joinee.component';

describe('NewJoineeComponent', () => {
  let component: NewJoineeComponent;
  let fixture: ComponentFixture<NewJoineeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJoineeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJoineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
