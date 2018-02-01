import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GameProvider} from '../../../../providers/tables/game/game';
import {Location} from '../../../../assets/models/interfaces/Location';
import {SettingProvider} from '../../../../providers/setting/setting';
import {Puzzle} from '../../../../assets/models/interfaces/Puzzle';

@IonicPage()
@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {
  locationTemp = {} as Location;

  constructor(private settingProvider: SettingProvider, private gameProvider: GameProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.initLocation();
  }

  initLocation() {
    this.locationTemp = {} as Location;
    this.locationTemp.puzzles = null;
    this.locationTemp.name = '';
    this.locationTemp.type = '';
    this.locationTemp.photoUrl = '';
    this.locationTemp.order = 0;
  }

  editLocation(locationId) {
    this.locationTemp = this.gameProvider.gameTableInfo[locationId];
  }

  addLocation() {
    this.updateLocation(this.settingProvider.time);
  }

  updateLocation(locationId) {
    this.gameProvider.updateLocation(locationId, this.locationTemp).then((res) => {
      console.log("update game table res", res)
    }).catch((err) => {
      console.log("update game table err", err);
    });
    this.initLocation();
  }

  deleteLocation(locationId) {
    this.locationTemp = null;
    this.updateLocation(locationId);
  }

  viewPuzzles(locationId) {
    this.navCtrl.push("PuzzleListPage", {"locationId": locationId});
  }
}
