import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {UserProvider} from '../../providers/tables/user/user';
import {GameProvider} from '../../providers/tables/game/game';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  @ViewChild('tabs') tabRef: Tabs;

  tab1: string = 'GamePage';
  tab2: string = 'GroupPage';
  tab3: string = 'AboutPage';

  constructor(private gameProvider:GameProvider,private events: Events, public userProvider: UserProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.events.subscribe(this.userProvider.USER_TABLE_UPDATE);
    this.events.subscribe(this.gameProvider.GAME_TABLE_UPDATE);
  }


  ionViewDidEnter() {
    this.tabRef.select(2);
  }

  ionViewWillEnter() {
    this.userProvider.checkFireBaseConnection();
    this.userProvider.getUserTable();
    this.gameProvider.getGameTable();

  }

  ionViewWillLeave() {
    this.events.unsubscribe(this.userProvider.USER_TABLE_UPDATE);
    this.events.unsubscribe(this.gameProvider.GAME_TABLE_UPDATE);
  }

}
