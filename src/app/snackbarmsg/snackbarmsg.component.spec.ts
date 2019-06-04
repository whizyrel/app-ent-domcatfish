import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarmsgComponent } from './snackbarmsg.component';

describe('SnackbarmsgComponent', () => {
  let component: SnackbarmsgComponent;
  let fixture: ComponentFixture<SnackbarmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
