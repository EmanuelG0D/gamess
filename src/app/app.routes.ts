import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { GamesComponent } from './pages/games/games.component';

//En el aap.component.html debemos tener <router-outlet></router-outlet> para que funcione lo de las rutas así

export const routes: Routes = [
    {
        path: '',
        pathMatch:"full",
        redirectTo: 'login'
    },
   
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: GamesComponent,
        canActivate: [authGuard]
    },
    {
        path: '**', 
        pathMatch: 'full',
        redirectTo: 'admin', 
        
    }
];
