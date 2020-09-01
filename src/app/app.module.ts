import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { DocumentModule } from './documents/document.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { ActivityComponent } from './components/activity/activity.component'
import { SubActivityComponent } from './components/sub-activity/sub-activity.component'

import { DataService } from './services/data.service';
import { ProjectComponent } from './pages/project/project.component';
import { StartComponent } from './pages/start/start.component'

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppConfig } from '../environments/environment';

import { FireBaseService } from './services/firebase.service';
import { TestService } from './services/test.service';
import { LoginComponent } from './pages/login/login.component';
import { BlockBuilderComponent } from './admin/block-builder/block-builder.component';
import { AdminComponent } from './admin/admin.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ActivityOutlineComponent } from './components/activity-outline/activity-outline.component';
import { StoreModule } from '@ngrx/store'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivateComponent } from './components/activate/activate.component';
import { DryfixComponent } from './pages/dryfix/dryfix.component';
import { DfCreateProjectComponent } from './pages/dryfix/df-create-project/df-create-project.component';
import { DfProjectsListComponent } from './pages/dryfix/df-projects-list/df-projects-list.component';
import { DfProjectComponent } from './pages/dryfix/df-project/df-project.component';
import { DfCreateProtocolComponent } from './pages/dryfix/df-create-protocol/df-create-protocol.component';
import { DfProtocolsListComponent } from './pages/dryfix/df-protocols-list/df-protocols-list.component';
import { DfProtocolComponent } from './pages/dryfix/df-protocol/df-protocol.component';
import { DfProtocolDrillComponent } from './pages/dryfix/df-protocol-drill/df-protocol-drill.component';
import { DfMpCreateComponent } from './pages/dryfix/df-mp-create/df-mp-create.component';
import { DfProtocolDrillMpComponent } from './pages/dryfix/df-protocol-drill-mp/df-protocol-drill-mp.component';
import { DfProtocolMountComponent } from './pages/dryfix/df-protocol-mount/df-protocol-mount.component';
import { DfProtocolMountMpComponent } from './pages/dryfix/df-protocol-mount-mp/df-protocol-mount-mp.component';
import { DfProtocolReadComponent } from './pages/dryfix/df-protocol-read/df-protocol-read.component';
import { DfProtocolReadMpComponent } from './pages/dryfix/df-protocol-read-mp/df-protocol-read-mp.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { dryfixReducer } from './ngrx/reducers/dryfix.reducer'
import { mpsReducer } from './ngrx/reducers/mps.reducer'
import { protocolsReducer } from './ngrx/reducers/protocol.reducer'
import { DryfixEffects } from './ngrx/effects/dryfix.effects'
import { MpsEffects } from './ngrx/effects/mps.effects'
import { protocolsEffects } from './ngrx/effects/protocol.effects'

import { StateService } from './services/state.service'
import { MarkdownModule } from 'ngx-markdown';

import { DocumentService } from './services/document.service'

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ActivityComponent,
    StartComponent,
    LoginComponent,
    CreateProjectComponent,
    ActivityOutlineComponent,
    DryfixComponent,
    DfCreateProjectComponent,
    DfProjectsListComponent,
    DfProjectComponent,
    DfCreateProtocolComponent,
    DfProtocolsListComponent,
    DfProtocolComponent,
    DfProtocolDrillComponent,
    DfMpCreateComponent,
    DfProtocolDrillMpComponent,
    DfProtocolMountComponent,
    DfProtocolMountMpComponent,
    DfProtocolReadComponent,
    DfProtocolReadMpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AdminModule,
    DocumentModule,
    DetailModule,
    MarkdownModule.forRoot(),
    AngularFireModule.initializeApp(AppConfig.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({
      dryfix: dryfixReducer,
      mps: mpsReducer,
      protocols: protocolsReducer
    }),
    EffectsModule.forRoot([DryfixEffects, MpsEffects, protocolsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: AppConfig.production }),

  ],
  providers: [DataService, FireBaseService, StateService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
