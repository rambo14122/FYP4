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
  groupTemp = {} as Group;
  groupId: string;
  lock = false;

  constructor(private userProvider: UserProvider, private groupProvider: GroupProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.groupId = this.navParams.get("groupId");
    if (this.groupId != null) {
      this.groupTemp.name = this.groupProvider.groupTableInfo[this.groupId].name;
      this.groupTemp.photoUrl = this.groupProvider.groupTableInfo[this.groupId].photoUrl;
    }
    else
      this.initGroup();
    this.lock = false;
  }

  initGroup() {
    this.groupTemp = {} as Group;
    this.groupTemp.members = [];
    this.groupTemp.groupCreator = '';
    this.groupTemp.photoUrl = '';
    this.groupTemp.name = '';
    this.groupTemp.groupNumber = 0;
  }

  update() {
    this.lock = true;
    if (this.groupId == null)
      this.createGroup();
    else
      this.updateGroup();
  }

  updateGroup() {
    this.groupProvider.updateGroup(this.groupId, this.groupTemp).then((res) => {
      if (res) {
        this.navCtrl.pop();
      }
    }).catch((err) => {
      this.lock = false;
    });
  }

  quitGroup() {
    var promise = new Promise((resolve, reject) => {
      this.groupProvider.quitGroup().then((res) => {
        console.log(res);
        resolve(true);
      }).catch((err) => {
        console.log(err);
        reject(err);
        this.lock = false;
      })
    });
    return promise;
  }

  createGroup() {
    this.groupTemp.members.push(this.userProvider.getUid());
    this.groupTemp.groupCreator = this.userProvider.getUid();
    if (this.groupProvider.userGroupId == null || this.groupProvider.userGroupId == '') {
      this.createGroupFurther();
    }
    else {
      this.quitGroup().then((res) => {
        if (res) {
          this.createGroupFurther();
        }
      }).catch((err) => {

      })
    }

  }

  createGroupFurther() {
    this.groupProvider.createGroup(this.groupTemp).then((res) => {
      this.navCtrl.pop();
    }).catch((err) => {
      this.lock = false;
    });
  }
}
