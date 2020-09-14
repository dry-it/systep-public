import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpConstructionComponent } from './mp-construction.component';

describe('MpConstructionComponent', () => {
  let component: MpConstructionComponent;
  let fixture: ComponentFixture<MpConstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpConstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
