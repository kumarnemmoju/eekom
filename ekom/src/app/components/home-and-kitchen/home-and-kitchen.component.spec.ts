import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAndKitchenComponent } from './home-and-kitchen.component';

describe('HomeAndKitchenComponent', () => {
  let component: HomeAndKitchenComponent;
  let fixture: ComponentFixture<HomeAndKitchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAndKitchenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAndKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
