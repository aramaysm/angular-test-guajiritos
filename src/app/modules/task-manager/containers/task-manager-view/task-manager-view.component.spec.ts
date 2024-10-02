import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerViewComponent } from './task-manager-view.component';

describe('TaskManagerViewComponent', () => {
  let component: TaskManagerViewComponent;
  let fixture: ComponentFixture<TaskManagerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagerViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
