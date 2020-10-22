import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfCreateProjectComponent } from './df-create-project.component';

describe('DfCreateProjectComponent', () => {
  let component: DfCreateProjectComponent;
  let fixture: ComponentFixture<DfCreateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfCreateProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfCreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
