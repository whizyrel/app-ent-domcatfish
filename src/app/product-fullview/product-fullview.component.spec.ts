import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFullviewComponent } from './product-fullview.component';

describe('ProductFullviewComponent', () => {
  let component: ProductFullviewComponent;
  let fixture: ComponentFixture<ProductFullviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFullviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFullviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
