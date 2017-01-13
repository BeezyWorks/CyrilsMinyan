import { Component, OnInit, Input } from '@angular/core';
import { UserDetails } from '../models/user-details.model';
import { AngularFire, FirebaseObjectObservable, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() isRegister: boolean;
  title: string;
  submitText: string;
  password: string;
  repeatPassword: string;
  registerError: string;

  auth: FirebaseAuthState;

  details: UserDetails = new UserDetails();

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.title = this.isRegister ? "Register" : "Update Details";
    this.submitText = this.isRegister ? "Register" : "Save Details";

    this.af.auth.subscribe((auth) => {
      this.auth = auth;
      if (this.auth != null) {
        let userPath = 'users/' + this.auth.uid + '/details';
        this.af.database.object(userPath).subscribe(user => {
          this.details = <UserDetails>user as UserDetails;
          for (let key in this.details) {
            if (key.includes('$')) {
              delete this.details[key];
            }
          }
          // this.details.firstName=user['firstName'];
          // this.details.lastName=user['lastName'];
          // this.details.email = user['email'];
          // this.details.address = user['address'];
          // this.details.host = user['host'];
          // this.details.phone = user['phone'];
        });
      }
    });
  }

  registerClicked() {
    if (this.isRegister) {
      this.registerUser();
    }
    else {
      this.updateUserDetails();
    }
  }

  registerUser() {
    let creds = { email: this.details.email, password: this.password };
    this.af.auth.createUser(creds).then((auth) => {
      this.auth = auth;
    },
      (error) => {
        this.registerError = error.message;
      })
  }

  updateUserDetails() {
    let userPath = 'users/' + this.auth.uid + '/details';
    console.log(this.details);
    this.af.database.object(userPath).set(this.details).then(resolve => { }, error => { console.log(error) });
  }

}
