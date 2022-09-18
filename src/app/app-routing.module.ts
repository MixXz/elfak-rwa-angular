import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { GunAdDetailsComponent } from './components/gun-ad-details/gun-ad-details.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { AuthGuard } from './auth/auth.guard';
import { Roles } from './enums/role';
import { SavedAdsComponent } from './components/saved-ads/saved-ads.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'gun-ad-details/:id',
    component: GunAdDetailsComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.User },
  },
  {
    path: 'myAds',
    component: MyAdsComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.User },
  },
  {
    path: 'create-ad',
    component: CreateAdComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.User },
  },
  {
    path: 'edit-ad/:id',
    component: EditAdComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.User },
  },
  {
    path: 'saved-ads',
    component: SavedAdsComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.User },
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { role: Roles.Admin },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
