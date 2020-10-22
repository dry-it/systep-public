import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectComponent } from '../project/project.component';
import { StartComponent } from '../start/start.component';


import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { ProjectWrapperComponent } from '../project-wrapper/project-wrapper.component';
import { SettingsComponent } from '../settings/settings.component';
import { ProjectParticipantsComponent } from '../project-participants/project-participants.component';
import { TemplateToolComponent } from '../template-tool/template-tool.component';
import { FilterComponent } from '../filter/filter.component';
import { DryfixComponent } from '../dryfix/dryfix.component';
import { DfProjectComponent } from '../dryfix/df-project/df-project.component';
import { DfProtocolComponent } from '../dryfix/df-protocol/df-protocol.component';
import { ProtocolViewComponent } from 'app/dryfix/protocol-view/protocol-view.component';

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
            path: 'participants',
            component: ProjectParticipantsComponent
          }
        ]
      },

      {
        path: 'start',
        component: StartComponent
      },
      {
        path: 'filter',
        component: FilterComponent
      },
      {
        path: 'templates',
        component: TemplateToolComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
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
      },
    ]
  },
  {
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    path: 'protocol-viewer/:projectid/:protocolid',
    component: ProtocolViewComponent
  }]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
