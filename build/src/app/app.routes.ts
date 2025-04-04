import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { BlackjackComponent } from './Blackjack/blackjack.component';
import { MinesComponent } from './mines/mines.component';
import { RuletaComponent } from './Roultette/ruleta.component';
import { BaccaratComponent } from './baccarat/baccarat.component';
import { SlotsComponent } from './Slots/slots.component';
import { DicesComponent } from './Dice_Game/dices.component';
import { AuthGuard } from './auth.guard'; 
import { HttpClient } from '@angular/common/http';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' }, // Redirect root to main
    { path: 'main', component: MainComponent }, // Main component route

    { path: 'login', component: LoginComponent , canActivate: [AuthGuard]},
    { path: 'form', component: FormComponent , canActivate: [AuthGuard]},
    { path: 'register', component: RegisterComponent , canActivate: [AuthGuard]},
    { path: 'blackjack', component: BlackjackComponent , canActivate: [AuthGuard]},
    { path: 'mines', component: MinesComponent , canActivate: [AuthGuard]},
    { path: 'ruletka', component: RuletaComponent , canActivate: [AuthGuard]},
    { path: 'baccarat', component: BaccaratComponent , canActivate: [AuthGuard]},
    { path: 'slots', component: SlotsComponent , canActivate: [AuthGuard]},
    { path: 'dice', component: DicesComponent , canActivate: [AuthGuard]},
    { path: 'mines', component: MinesComponent , canActivate: [AuthGuard]},
    { path: 'ruletka', component: RuletaComponent , canActivate: [AuthGuard]},
    { path: 'baccarat', component: BaccaratComponent , canActivate: [AuthGuard]},
    { path: 'slots', component: SlotsComponent , canActivate: [AuthGuard]},
    { path: 'dice', component: DicesComponent , canActivate: [AuthGuard]},

];
