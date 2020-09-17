import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityComponent } from '../components/activity/activity.component';
import { SubActivityComponent } from '../components/sub-activity/sub-activity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FireBaseService } from '../services/firebase.service';
import { CreateNewsComponent } from './create-news/create-news.component';
import { FroalaViewModule, FroalaEditorModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    AdminComponent, CreateNewsComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule, ReactiveFormsModule,     FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),]
})
export class AdminModule { }
