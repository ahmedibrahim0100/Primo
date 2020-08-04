import { Routes } from '@angular/router';
import { SignUpComponent } from './Authentication/Components/sign-up/sign-up.component';
import { SignInComponent } from './Authentication/Components/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Authorization/auth.guard';

export const appRoutes : Routes = [
    { path : '', redirectTo : '/signin', pathMatch : 'full' },
    { path : 'home', component : HomeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignUpComponent },
    { path : 'signin', component : SignInComponent }
]