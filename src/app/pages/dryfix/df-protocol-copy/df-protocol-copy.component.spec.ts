import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolCopyComponent } from './df-protocol-copy.component';

describe('DfProtocolCopyComponent', () => {
  let component: DfProtocolCopyComponent;
  let fixture: ComponentFixture<DfProtocolCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
