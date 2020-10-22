import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolMountComponent } from './df-protocol-mount.component';

describe('DfProtocolMountComponent', () => {
  let component: DfProtocolMountComponent;
  let fixture: ComponentFixture<DfProtocolMountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolMountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolMountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
