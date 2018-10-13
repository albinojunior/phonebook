import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'meus-contatos', component: ContactListComponent, canActivate: [AuthGuardService]},
    { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(routes);

