import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { NavItemComponent } from './admin/navigation/nav-content/nav-item/nav-item.component';
import { NavGroupComponent } from './admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavRightComponent } from './admin/nav-bar/nav-right/nav-right.component';
import { NavLeftComponent } from './admin/nav-bar/nav-left/nav-left.component';
import { NavContentComponent } from './admin/navigation/nav-content/nav-content.component';
import { NavigationComponent } from './admin/navigation/navigation.component';
import { NavBarComponent } from './admin/nav-bar/nav-bar.component';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationItem } from './admin/navigation/navigation';
import { NavSearchComponent } from './admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './client/header/header.component';
import { FooterComponent } from './client/footer/footer.component';
import { AuthServiceConfig, FacebookLoginProvider, SocialLoginModule } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('584028956313938')
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ClientComponent,
    NavBarComponent,
    NavigationComponent,
    NavContentComponent,
    NavLeftComponent,
    NavRightComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NavItemComponent,
    NavSearchComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent, FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    ClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbDropdownModule,
    SocialLoginModule

  ],
  providers: [NavigationItem,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
