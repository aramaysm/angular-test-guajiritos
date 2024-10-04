import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagerViewComponent } from './users-manager-view.component';

describe('UsersManagerViewComponent', () => {
  let component: UsersManagerViewComponent;
  let fixture: ComponentFixture<UsersManagerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManagerViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
