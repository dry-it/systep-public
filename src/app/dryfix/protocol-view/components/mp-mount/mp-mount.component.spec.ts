import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpMountComponent } from './mp-mount.component';

describe('MpMountComponent', () => {
  let component: MpMountComponent;
  let fixture: ComponentFixture<MpMountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpMountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpMountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
