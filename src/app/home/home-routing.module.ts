import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectComponent } from '../pages/project/project.component';
import { StartComponent } from '../pages/start/start.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { CreateProjectComponent } from '../pages/create-project/create-project.component';
import { DryfixComponent } from '../pages/dryfix/dryfix.component';
import { DfProjectComponent } from '../pages/dryfix/df-project/df-project.component';
import { DfProtocolComponent } from '../pages/dryfix/df-protocol/df-protocol.component';

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
        path: 'project/:id',
        component: ProjectComponent
      },
      {
        path: 'start',
        component: StartComponent
      },
      {
        path: 'create-project',
        component: CreateProjectComponent
      },
      {
        path: 'dryfix',
        component: DryfixComponent
      },
      {
        path: 'dryfix/project/:id',
        component: DfProjectComponent
      },
      {
        path: 'dryfix/project/:id/protocol/:pid',
        component: DfProtocolComponent
      }
    ]
  },];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
