import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAndListsComponent } from './accounts-and-lists.component';

describe('AccountsAndListsComponent', () => {
  let component: AccountsAndListsComponent;
  let fixture: ComponentFixture<AccountsAndListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsAndListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsAndListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
