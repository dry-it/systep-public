import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProjectComponent } from './df-project.component';

describe('DfProjectComponent', () => {
  let component: DfProjectComponent;
  let fixture: ComponentFixture<DfProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
