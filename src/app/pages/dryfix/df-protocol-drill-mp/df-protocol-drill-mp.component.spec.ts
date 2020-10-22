import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolDrillMpComponent } from './df-protocol-drill-mp.component';

describe('DfProtocolDrillMpComponent', () => {
  let component: DfProtocolDrillMpComponent;
  let fixture: ComponentFixture<DfProtocolDrillMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolDrillMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolDrillMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
