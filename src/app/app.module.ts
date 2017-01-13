import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HeaderComponent } from './header/header.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ShabbosCardComponent } from './shabbos-card/shabbos-card.component';
import { ThisWeekComponent } from './this-week/this-week.component';
import { LastElementPipe } from './last-element.pipe';


const appRoutes: Routes = [
  { path: 'details', component: UserDetailsComponent },
  {path: 'schedule', component: ScheduleComponent},
  {path: 'thisweek', component: ThisWeekComponent}
];

export const firebaseConfig = {
  apiKey: "AIzaSyCW4XSV3kThLS0XZ5yqFnvquOauGhDPdiY",
  authDomain: "cyrilsminyan.firebaseapp.com",
  databaseURL: "https://cyrilsminyan.firebaseio.com",
  storageBucket: "cyrilsminyan.appspot.com",
  messagingSenderId: "202011860630"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    UserDetailsComponent,
    HeaderComponent,
    ScheduleComponent,
    ShabbosCardComponent,
    ThisWeekComponent,
    LastElementPipe
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
