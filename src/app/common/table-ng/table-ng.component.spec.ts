import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNgComponent } from './table-ng.component';

describe('TableNgComponent', () => {
  let component: TableNgComponent;
  let fixture: ComponentFixture<TableNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
