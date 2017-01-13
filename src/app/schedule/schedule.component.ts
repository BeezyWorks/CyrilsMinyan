import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
import { Shabbos } from '../models/shabbos.model';
import * as Hebcal from 'hebcal';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  shabbosos: FirebaseListObservable<Shabbos[]>;
  lastShabbosInList: Shabbos;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    let jDate = new Hebcal.HDate();
    while (jDate.getDay() != 6) {
      jDate = jDate.next();
    }

    let comingShabbosDate: Date = jDate.greg();

    this.shabbosos = this.af.database.list('/shabbosos', {
      query: {
        orderByChild: 'date',
        startAt: comingShabbosDate.valueOf()
      }
    });

    this.shabbosos.subscribe(shabbosos => {
      this.lastShabbosInList = shabbosos[shabbosos.length - 1];
    })
  }

  addShabbos() {
    if (this.lastShabbosInList == undefined)
      return;
    let lastShabbos = this.lastShabbosInList;
    let jDate = new Hebcal.HDate(new Date(lastShabbos.date));
    jDate.setCity("jerusalem");
    jDate = jDate.next();
    while (jDate.getDay() != 6) {
      jDate = jDate.next();
    }
    let newShabbos = new Shabbos();
    newShabbos.date = jDate.greg().valueOf();
    let parshios: string[] = jDate.getSedra('h');
    newShabbos.parsha = "";
    for (let parsha of parshios) {
      newShabbos.parsha += parsha + " ";
    }
    newShabbos.hebrewDate = jDate.toString('h');
    newShabbos.earliestHavdala = jDate.havdalah().valueOf();
    var MS_PER_MINUTE = 60000;
    newShabbos.candelLight = new Date(jDate.sunset() - 40 * MS_PER_MINUTE).valueOf();
    newShabbos.mincha = new Date(jDate.sunset() - 10 * MS_PER_MINUTE).valueOf();
    newShabbos.maariv = new Date(jDate.havdalah() - 10 * MS_PER_MINUTE).valueOf();
    this.lastShabbosInList=newShabbos;
    this.af.database.object('shabbosos/' + newShabbos.date).set(newShabbos);


  }

}
