import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreeMusicComponent } from './add-free-music.component';

describe('AddFreeMusicComponent', () => {
  let component: AddFreeMusicComponent;
  let fixture: ComponentFixture<AddFreeMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFreeMusicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFreeMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
