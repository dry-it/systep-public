import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpConstructionHeaderComponent } from './mp-construction-header.component';

describe('MpConstructionHeaderComponent', () => {
  let component: MpConstructionHeaderComponent;
  let fixture: ComponentFixture<MpConstructionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpConstructionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpConstructionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
