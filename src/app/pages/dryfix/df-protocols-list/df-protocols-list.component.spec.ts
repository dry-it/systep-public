import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfProtocolsListComponent } from './df-protocols-list.component';

describe('DfProtocolsListComponent', () => {
  let component: DfProtocolsListComponent;
  let fixture: ComponentFixture<DfProtocolsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfProtocolsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfProtocolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
