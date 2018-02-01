import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from '../../assets/models/interfaces/User';
import {UserProvider} from '../../providers/tables/user/user';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userTemp = {} as User;

  constructor(private userProvider: UserProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.initUser();
  }

  initUser() {
    this.userTemp = {} as User;
    this.userTemp.name = '';
    this.userTemp.photoUrl = '';
    this.userTemp.edited = false;
  }

  update() {

    this.userProvider.updateUser(this.userTemp).then((res) => {
      console.log("update", res);
      this.navCtrl.push("TabsPage");
    })
      .catch((err) => {
        console.log("err", err.message);
      })

  }

}
