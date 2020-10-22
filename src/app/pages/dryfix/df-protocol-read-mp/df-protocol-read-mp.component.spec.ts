import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolReadMpComponent } from './df-protocol-read-mp.component';

describe('DfProtocolReadMpComponent', () => {
  let component: DfProtocolReadMpComponent;
  let fixture: ComponentFixture<DfProtocolReadMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolReadMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolReadMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
