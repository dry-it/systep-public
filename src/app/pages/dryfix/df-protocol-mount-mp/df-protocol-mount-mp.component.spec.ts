import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolMountMpComponent } from './df-protocol-mount-mp.component';

describe('DfProtocolMountMpComponent', () => {
  let component: DfProtocolMountMpComponent;
  let fixture: ComponentFixture<DfProtocolMountMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolMountMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolMountMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
