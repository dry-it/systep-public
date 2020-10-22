import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProjectsListComponent } from './df-projects-list.component';

describe('DfProjectsListComponent', () => {
  let component: DfProjectsListComponent;
  let fixture: ComponentFixture<DfProjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
