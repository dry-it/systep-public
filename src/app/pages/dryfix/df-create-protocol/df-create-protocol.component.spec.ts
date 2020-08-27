import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfCreateProtocolComponent } from './df-create-protocol.component';

describe('DfCreateProtocolComponent', () => {
  let component: DfCreateProtocolComponent;
  let fixture: ComponentFixture<DfCreateProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfCreateProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfCreateProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
