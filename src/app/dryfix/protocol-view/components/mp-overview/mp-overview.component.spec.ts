import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpOverviewComponent } from './mp-overview.component';

describe('MpOverviewComponent', () => {
  let component: MpOverviewComponent;
  let fixture: ComponentFixture<MpOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
