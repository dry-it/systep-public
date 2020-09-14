import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpProbesComponent } from './mp-probes.component';

describe('MpProbesComponent', () => {
  let component: MpProbesComponent;
  let fixture: ComponentFixture<MpProbesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpProbesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpProbesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
