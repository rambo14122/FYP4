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
    this.locationTemp.puzzles = null;
    this.locationTemp.name = '';
    this.locationTemp.type = '';
    this.locationTemp.photoUrl = '';
    this.locationTemp.order = 0;
  }

  editLocation(locationId) {
    this.locationTemp = this.gameProvider.gameTableInfo[locationId];
    this.updateLocation(locationId);
  }

  addLocation() {
    this.settingProvider.getEstimatedServerTimeOnce().then((res) => {
      this.updateLocation(res);
    }).catch((err) => {

    });
  }

  updateLocation(locationId) {
    var gameToUpdate = Object.assign({}, this.gameProvider.gameTableInfo);
    gameToUpdate[locationId] = this.locationTemp;
    this.gameProvider.updateGameTable(gameToUpdate).then((res) => {
      console.log("update game table res", res)
    }).catch((err) => {
      console.log("update game table err", err);
    })
  }

  deleteLocation(locationId) {
    var gameToUpdate = Object.assign({}, this.gameProvider.gameTableInfo);
    gameToUpdate[locationId] = null;
    this.gameProvider.updateGameTable(gameToUpdate).then((res) => {
      console.log("update game table res", res)
    }).catch((err) => {
      console.log("update game table err", err);
    })
  }

  viewPuzzles(locationId) {
    this.navCtrl.push("PuzzleListPage", {"locationId": locationId});
  }
}
