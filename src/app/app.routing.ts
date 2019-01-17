import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { AnswersComponent } from './answers/answers.component';

import { AuthGuard } from '../common/guards/auth.guard'

const appRoutes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'search', component: SearchComponent },
  { path: 'result', component: ResultComponent },
  { path: 'answers', component: AnswersComponent },
  // { path: 'main/:appId', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/signin' }

];

export const routing = RouterModule.forRoot(appRoutes);
