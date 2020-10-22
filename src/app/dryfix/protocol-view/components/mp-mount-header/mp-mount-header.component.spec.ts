import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpMountHeaderComponent } from './mp-mount-header.component';

describe('MpMountHeaderComponent', () => {
  let component: MpMountHeaderComponent;
  let fixture: ComponentFixture<MpMountHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpMountHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpMountHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
