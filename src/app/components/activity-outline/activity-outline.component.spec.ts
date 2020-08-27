import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOutlineComponent } from './activity-outline.component';

describe('ActivityOutlineComponent', () => {
  let component: ActivityOutlineComponent;
  let fixture: ComponentFixture<ActivityOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
