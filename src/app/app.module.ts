import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatCheckboxModule,
  MatSelectModule,
  MatMenuModule,
  MatSortModule,
  MatDialogModule,
  MatListModule,
  MatIconModule,
  MatGridListModule
} from '@angular/material';


import { AuthGuard } from '../common/guards/auth.guard';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { AnswersComponent } from './answers/answers.component';
import { NavigationComponent } from './shared/nav/nav.component';

import { TitleService } from '../common/services/title.service';
import { AuthService } from '../common/services/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
		SignUpComponent,
    SignInComponent,
    SearchComponent,
    ResultComponent,
    AnswersComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatSortModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [
    AuthGuard,
    Title,
    TitleService,
    AuthService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
