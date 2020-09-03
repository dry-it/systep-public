import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListerComponent } from './document-lister.component';

describe('DocumentListerComponent', () => {
  let component: DocumentListerComponent;
  let fixture: ComponentFixture<DocumentListerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
