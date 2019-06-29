import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountLoginComponent } from './add-account-login.component';

describe('AddAccountLoginComponent', () => {
  let component: AddAccountLoginComponent;
  let fixture: ComponentFixture<AddAccountLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
