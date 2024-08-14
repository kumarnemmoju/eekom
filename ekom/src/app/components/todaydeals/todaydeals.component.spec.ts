import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaydealsComponent } from './todaydeals.component';

describe('TodaydealsComponent', () => {
  let component: TodaydealsComponent;
  let fixture: ComponentFixture<TodaydealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaydealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaydealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
