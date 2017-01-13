import { Component, OnChanges, Input } from '@angular/core';
import { Shabbos } from '../models/shabbos.model';
import { UserDetails } from '../models/user-details.model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as Hebcal from 'hebcal';

@Component({
  selector: 'shabbos-card',
  templateUrl: './shabbos-card.component.html',
  styleUrls: ['./shabbos-card.component.css']
})
export class ShabbosCardComponent implements OnChanges {

  @Input() shabbos: Shabbos;
  host: FirebaseObjectObservable<UserDetails>;

  constructor(private af: AngularFire) { }


  ngOnChanges() {
    if (this.shabbos == null || this.shabbos == undefined)
      return;
    if (this.shabbos.hostId != undefined && this.shabbos.hostId != "No Host") {
      this.host = this.af.database.object('users/' + this.shabbos.hostId + '/details');
    }
  }

  volunteer() {
    this.af.auth.subscribe(user => {
      for (var key in this.shabbos) {
        if (key.includes('$')) {
          delete this.shabbos[key];
        }
      }
      this.shabbos.hostId = user.uid;
      this.af.database.object('shabbosos/' + this.shabbos.date).set(this.shabbos);
    })
  }

}
