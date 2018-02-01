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
  }

  createGroup() {
    this.navCtrl.push("GroupProfilePage");
  }

  joinGroup(groupId) {
    if (this.groupProvider.groupLeaderFlag) {
      this.groupProvider.dismissGroup(this.groupProvider.userGroupId).then((res) => {
        if (res == true) {
          this.joinGroupFurther(groupId);
        }
      }).catch((err) => {
      });
    }
    else {
      if (this.groupProvider.userGroupId != null && this.groupProvider.userGroupId != '') {
        this.joinGroupFurther(groupId);
      }
      else {
        this.quitGroup().then((res) => {
            if (res) {
              this.joinGroupFurther(groupId);
            }
          }
        ).catch((err) => {
          console.log(err);
        })
      }

    }
  }

  joinGroupFurther(groupId) {
    this.groupProvider.joinGroup(groupId).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  quitGroup() {
    var promise = new Promise((resolve, reject) => {
      this.groupProvider.quitGroup().then((res) => {
        console.log(res);
        resolve(true);
      }).catch((err) => {
        console.log(err);
        reject(err);
      })
    });
    return promise;
  }

  editGroup(groupId)
  {
    this.navCtrl.push("GroupProfilePage",{'groupId':groupId});
  }
}
