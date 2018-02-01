import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SettingProvider} from '../../../../providers/setting/setting';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(private settingProvider: SettingProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  goToLocationPage() {
    this.navCtrl.push("LocationListPage");
  }

  startGame() {

  }
}
