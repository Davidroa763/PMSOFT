import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './modulos_login/_guards/index';

import { CensoComponent } from './components/censo/censo.component';
import { ErrorComponent } from './components/error/error.component';
import { SensibilizacionComponent } from './components/censo/sensibilizacion/sensibilizacion';
import { CensoTributarioComponent } from './components/censo/censo_tributario/censo_tributario'
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent },
    { path: 'censo', component: CensoComponent},
    { path: 'sensibilizacion', component: SensibilizacionComponent},
    { path: 'censotributario', component: CensoTributarioComponent},

    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
    { path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
