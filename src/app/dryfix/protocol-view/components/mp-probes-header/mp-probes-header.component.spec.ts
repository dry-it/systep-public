import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpProbesHeaderComponent } from './mp-probes-header.component';

describe('MpProbesHeaderComponent', () => {
  let component: MpProbesHeaderComponent;
  let fixture: ComponentFixture<MpProbesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpProbesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpProbesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
