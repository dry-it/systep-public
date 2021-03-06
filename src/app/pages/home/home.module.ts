import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ActivityComponent } from '../../components/activity/activity.component';
import { SubActivityComponent } from '../../components/sub-activity/sub-activity.component';
import { ActivateComponent } from '../../components/activate/activate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    HomeComponent,
    SubActivityComponent,
    ActivateComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, ReactiveFormsModule],
  providers: [DatePipe]
})
export class HomeModule { }
