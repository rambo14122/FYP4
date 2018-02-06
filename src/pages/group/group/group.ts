import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  publicChat() {
    this.navCtrl.push("ChatPage", {"title": "Public Chat", "type": "public"});
  }

  joinGroup() {
    this.navCtrl.push("GroupListPage");
  }

}
