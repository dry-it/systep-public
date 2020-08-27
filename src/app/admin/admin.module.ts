import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {BlockBuilderComponent} from './block-builder/block-builder.component'

import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { ActivityComponent } from '../components/activity/activity.component';
import { SubActivityComponent } from '../components/sub-activity/sub-activity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FireBaseService } from '../services/firebase.service';

@NgModule({
  declarations: [
    AdminComponent, BlockBuilderComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule, ReactiveFormsModule]
})
export class AdminModule { }
