import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SettingProvider } from '../providers/setting/setting';


import {config} from "./firebaseConfig";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuth} from "angularfire2/auth";
import { UserProvider } from '../providers/tables/user/user';
import {Network} from '@ionic-native/network';
import { ToastProvider } from '../providers/utility/toast/toast';
import { LoaderProvider } from '../providers/utility/loader/loader';
import {Device} from '@ionic-native/device';
import {OpenPage} from '../pages/open/open';
import { GameProvider } from '../providers/tables/game/game';
import { StatusProvider } from '../providers/tables/status/status';
import { GroupProvider } from '../providers/tables/group/group';

@NgModule({
  declarations: [
    MyApp,
    OpenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OpenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingProvider,
    UserProvider,

    AngularFireAuth,
    Network,
    ToastProvider,
    UserProvider,
    LoaderProvider,
    Device,
    GameProvider,
    StatusProvider,
    GroupProvider
  ]
})
export class AppModule {}
