import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolDrillComponent } from './df-protocol-drill.component';

describe('DfProtocolDrillComponent', () => {
  let component: DfProtocolDrillComponent;
  let fixture: ComponentFixture<DfProtocolDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
