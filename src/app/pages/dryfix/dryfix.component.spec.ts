import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DryfixComponent } from './dryfix.component';

describe('DryfixComponent', () => {
  let component: DryfixComponent;
  let fixture: ComponentFixture<DryfixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DryfixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DryfixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
