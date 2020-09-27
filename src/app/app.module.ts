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

import { HomeModule } from './pages/home/home.module';
import { AdminModule } from './admin/admin.module';
import { DocumentModule } from './documents/document.module';

import { AppComponent } from './app.component';
import { ActivityComponent } from './components/activity/activity.component'
import { SubActivityComponent } from './components/sub-activity/sub-activity.component'

import { DataService } from './services/data.service';
import { ProjectComponent } from './pages/project/project.component';
import { StartComponent } from './pages/start/start.component'

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AppConfig } from '../environments/environment';

import { FireBaseService } from './services/firebase.service';
import { TestService } from './services/test.service';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ActivityOutlineComponent } from './components/activity-outline/activity-outline.component';
import { StoreModule } from '@ngrx/store'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivateComponent } from './components/activate/activate.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { dryfixReducer } from './ngrx/reducers/dryfix.reducer'
import { mpsReducer } from './ngrx/reducers/mps.reducer'
import { protocolsReducer } from './ngrx/reducers/protocol.reducer'
import { projectReducer } from './ngrx/reducers/project.reducer'
import { userReducer } from './ngrx/reducers/user.reducer'
import { usersReducer } from './ngrx/reducers/users.reducer'
import { DryfixEffects } from './ngrx/effects/dryfix.effects'
import { MpsEffects } from './ngrx/effects/mps.effects'
import { protocolsEffects } from './ngrx/effects/protocol.effects'
import { ProjectEffects } from './ngrx/effects/project.effects'
import { UserEffects } from './ngrx/effects/user.effects'
import { UsersEffects } from './ngrx/effects/users.effects'

import { StateService } from './services/state.service'
import { MarkdownModule } from 'ngx-markdown';


import { DocumentService } from './services/document.service';
import { ProjectWrapperComponent } from './pages/project-wrapper/project-wrapper.component';
import { FolderComponent } from './components/folder/folder.component';
import { FileComponent } from './components/file/file.component';
import { FileIconComponent } from './components/file-icon/file-icon.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProjectPanelComponent } from './components/project-panel/project-panel.component';
import { ProjectStatusComponent } from './components/project-status/project-status.component'

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProjectParticipantsComponent } from './pages/project-participants/project-participants.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { TemplateToolComponent } from './pages/template-tool/template-tool.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import {NgPipesModule} from 'ngx-pipes';


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
    ProjectWrapperComponent,
    FolderComponent,
    FileComponent,
    FileIconComponent,
    SettingsComponent,
    ProjectPanelComponent,
    ProjectStatusComponent,
    ProjectParticipantsComponent,
    ProfileImageComponent,
    TemplateToolComponent,
    LandingPageComponent,
    PasswordRecoveryComponent,
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
    MarkdownModule.forRoot(),
    AngularFireModule.initializeApp(AppConfig.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    NgPipesModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
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
      protocols: protocolsReducer,
      currentProject: projectReducer,
      currentUser: userReducer,
      users: usersReducer
    }),
    EffectsModule.forRoot([DryfixEffects, MpsEffects, protocolsEffects, ProjectEffects, UserEffects, UsersEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: AppConfig.production }),

  ],
  providers: [DataService, FireBaseService, StateService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
