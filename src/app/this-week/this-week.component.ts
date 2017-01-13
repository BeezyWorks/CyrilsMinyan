import { Component, OnInit } from '@angular/core';
import { Shabbos } from '../models/shabbos.model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as Hebcal from 'hebcal';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.css']
})
export class ThisWeekComponent implements OnInit {

  thisWeek: Shabbos;

  constructor(private af: AngularFire) { }


  ngOnInit() {
    this.af.database.list('/shabbosos', {
      query: {
        orderByChild: 'date',
        startAt: new Date().valueOf(),
        limitToFirst: 1
      }
    }).subscribe((shabbos) => {
      console.log(shabbos);
      this.thisWeek = shabbos[0] as Shabbos;
    });
  }

}
