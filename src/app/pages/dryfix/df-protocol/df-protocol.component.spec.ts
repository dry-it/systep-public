import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolComponent } from './df-protocol.component';

describe('DfProtocolComponent', () => {
  let component: DfProtocolComponent;
  let fixture: ComponentFixture<DfProtocolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
