import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Login } from '../models/logincredentials.model';

@Component({
  selector: 'login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  loginCreds = new Login("", "");
  submitted = false;

register: boolean;
  noUserError: string = "There is no user record corresponding to this identifier. The user may have been deleted.";
  badEmailError: string = "The email address is badly formatted.";
  noUser: boolean;
  badEmail: boolean;

  constructor(private af: AngularFire) { }

  ngOnInit() {
  }



  login() {
    this.badEmail = false;
    this.noUser = false;

    console.log(this.loginCreds);
    this.submitted = true;

    const loginPromise = this.af.auth.login({
      email: this.loginCreds.email,
      password: this.loginCreds.password,
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });

    loginPromise.then((authState) => {
      console.log(authState);
    },
      (reject) => {
        this.badEmail = (reject.message == this.badEmailError);
        this.noUser = (reject.message == this.noUserError);
      }
    )

  }

  loginWithGoogle() {
    console.log("login with Google!");
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect,
    });
  }

  registerClicked(){
    this.register=!this.register;
  }
}
