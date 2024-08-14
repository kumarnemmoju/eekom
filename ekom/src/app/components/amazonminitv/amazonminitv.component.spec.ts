import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonminitvComponent } from './amazonminitv.component';

describe('AmazonminitvComponent', () => {
  let component: AmazonminitvComponent;
  let fixture: ComponentFixture<AmazonminitvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmazonminitvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmazonminitvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
