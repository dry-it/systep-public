import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectComponent } from '../pages/project/project.component';
import { StartComponent } from '../pages/start/start.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { CreateProjectComponent } from '../pages/create-project/create-project.component';
import { ProjectWrapperComponent } from 'app/pages/project-wrapper/project-wrapper.component';
import { SettingsComponent } from 'app/pages/settings/settings.component';
import { ProjectPlanComponent } from 'app/pages/project-plan/project-plan.component';

const adminOnly = () => hasCustomClaim('admin');
const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [

      {
        path: 'projectview/:id',
        component: ProjectWrapperComponent,
        children: [
          {
            path: 'project',
            component: ProjectComponent
          },
          {
            path: 'project-plan',
            component: ProjectPlanComponent
          },
        ]
      },

      {
        path: 'start',
        component: StartComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'create-project',
        component: CreateProjectComponent
      }
    ]
  }]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
