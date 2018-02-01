import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GroupProvider} from '../../../providers/tables/group/group';

@IonicPage()
@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html',
})
export class GroupListPage {

  constructor(private groupProvider: GroupProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log("testId", this.groupProvider.userGroupId);
  }

  createGroup() {
    this.navCtrl.push("GroupProfilePage");
  }

  joinGroup(groupId) {
    this.groupProvider.joinGroup(groupId).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
}
