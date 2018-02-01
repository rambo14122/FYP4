import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Group} from '../../../assets/models/interfaces/Group';
import {GroupProvider} from '../../../providers/tables/group/group';
import {UserProvider} from '../../../providers/tables/user/user';

@IonicPage()
@Component({
  selector: 'page-group-profile',
  templateUrl: 'group-profile.html',
})
export class GroupProfilePage {
  groupTemp: Group;

  constructor(private userProvider: UserProvider, private groupProvider: GroupProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.initGroup();
  }

  initGroup() {
    this.groupTemp = {} as Group;
    this.groupTemp.members = [];
    this.groupTemp.groupCreator = '';
    this.groupTemp.photoUrl = '';
    this.groupTemp.name = '';
  }

  update() {
    this.createGroup();
  }

  createGroup() {
    this.groupTemp.members.push(this.userProvider.getUid());
    this.groupTemp.groupCreator = this.userProvider.getUid();
    this.groupProvider.createGroup(this.groupTemp).then((res) => {

    }).catch((err) => {

    });
  }
}
