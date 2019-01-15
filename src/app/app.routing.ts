import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { AnswersComponent } from './answers/answers.component';

import { AuthGuard } from '../common/guards/auth.guard'

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'result', component: ResultComponent },
  { path: 'answers', component: AnswersComponent },
  // { path: 'main/:appId', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }

];

export const routing = RouterModule.forRoot(appRoutes);
