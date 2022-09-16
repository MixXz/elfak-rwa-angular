import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppState } from './app.state';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';
import { CategoryEffects } from './store/category/category.effects';
import { AppRoutingModule } from './app-routing.module';
import { categoryReducer } from './store/category/category.reducer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GunAdComponent } from './components/gun-ad/gun-ad.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreateAdComponent } from './components/create-ad/create-ad.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { gunAdReducer } from './store/gun-ad/gun-ad.reducer';
import { GunAdEffects } from './store/gun-ad/gun-ad.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { InterceptorService } from './auth/interceptor';
import { GunAdDetailsComponent } from './components/gun-ad-details/gun-ad-details.component';
import {MatRippleModule} from '@angular/material/core';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { SavedAdsComponent } from './components/saved-ads/saved-ads.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatChipsModule} from '@angular/material/chips';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    GunAdComponent,
    FeedComponent,
    CreateAdComponent,
    GunAdDetailsComponent,
    MyAdsComponent,
    SavedAdsComponent,
    ToolbarComponent,
    EditAdComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot<AppState>({
      user: userReducer,
      category: categoryReducer,
      gunAd: gunAdReducer,
    }),
    EffectsModule.forRoot([UserEffects, CategoryEffects, GunAdEffects]),

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatStepperModule,
    MatSelectModule,
    DragDropModule,
    SlickCarouselModule,
    MatRippleModule,
    MatChipsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
