import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolReadComponent } from './df-protocol-read.component';

describe('DfProtocolReadComponent', () => {
  let component: DfProtocolReadComponent;
  let fixture: ComponentFixture<DfProtocolReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
