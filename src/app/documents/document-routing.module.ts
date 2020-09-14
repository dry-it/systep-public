import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document.component';
import { ProjectComponent } from '../pages/project/project.component';
import { StartComponent } from '../pages/start/start.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { CreateProjectComponent } from '../pages/create-project/create-project.component';
import { DryfixComponent } from '../pages/dryfix/dryfix.component';
import { DfProjectComponent } from '../pages/dryfix/df-project/df-project.component';
import { DfProtocolComponent } from '../pages/dryfix/df-protocol/df-protocol.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ProtocolViewComponent } from 'app/dryfix/protocol-view/protocol-view.component';

const adminOnly = () => hasCustomClaim('admin');
const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: 'doc',
    component: DocumentComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        component: ViewerComponent
      },
      {
        path: 'protocol-viewer/:projectid/:protocolid',
        component: ProtocolViewComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
