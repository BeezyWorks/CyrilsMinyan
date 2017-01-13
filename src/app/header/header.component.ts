import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 navTabs: NavTab[] = [
    { title: 'This Week', routing: '/thisweek' },
    { title: 'My Profile', routing: '/details' },
    { title: 'Schedule', routing: '/schedule' }
  ];
  constructor(private af: AngularFire) { }

  ngOnInit() {
  }

  logout() {
    this.af.auth.logout();
  }
}

export class NavTab {
  title: string;
  routing: string;
}
