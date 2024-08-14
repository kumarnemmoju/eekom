import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeFastDeliveryComponent } from './free-fast-delivery.component';

describe('FreeFastDeliveryComponent', () => {
  let component: FreeFastDeliveryComponent;
  let fixture: ComponentFixture<FreeFastDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreeFastDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeFastDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
