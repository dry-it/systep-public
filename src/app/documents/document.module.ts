import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';

import { DocumentComponent } from './document.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    DocumentComponent,
    ViewerComponent,],
  imports: [CommonModule, SharedModule, DocumentRoutingModule, ReactiveFormsModule, MarkdownModule]
})
export class DocumentModule { }
