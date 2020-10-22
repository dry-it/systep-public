import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpOverviewHeaderComponent } from './mp-overview-header.component';

describe('MpOverviewHeaderComponent', () => {
  let component: MpOverviewHeaderComponent;
  let fixture: ComponentFixture<MpOverviewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpOverviewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpOverviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
