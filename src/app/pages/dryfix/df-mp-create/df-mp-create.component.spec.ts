import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfMpCreateComponent } from './df-mp-create.component';

describe('DfMpCreateComponent', () => {
  let component: DfMpCreateComponent;
  let fixture: ComponentFixture<DfMpCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfMpCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfMpCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
