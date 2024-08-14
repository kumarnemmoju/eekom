import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshmeatComponent } from './freshmeat.component';

describe('FreshmeatComponent', () => {
  let component: FreshmeatComponent;
  let fixture: ComponentFixture<FreshmeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreshmeatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreshmeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
