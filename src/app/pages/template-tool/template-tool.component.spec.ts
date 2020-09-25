import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateToolComponent } from './template-tool.component';

describe('TemplateToolComponent', () => {
  let component: TemplateToolComponent;
  let fixture: ComponentFixture<TemplateToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
