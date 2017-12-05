import { Component } from '@angular/core';
import {Storage} from "@ionic/storage";
import {ModalController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";

import {LoginProvider} from '../../providers/login/login';
import {TranslateHelper} from "../../providers/helper/TranslateHelper";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  encryptPassword: string;
  userinfo;
  constructor(
    public modalCtrl: ModalController, private loginProvider: LoginProvider,
    private storage:Storage, private translate:TranslateHelper,
    public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      let title = await this.translate.translateI18n('common.text.title');
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: await this.translate.translateI18n('common.confirm.username'),
        buttons: [await this.translate.translateI18n('common.button.ok')]
      });
      alert.present();
    } else if (password.value.length == 0) {
      let alert = this.alertCtrl.create({
        title: await this.translate.translateI18n('common.text.title'),
        subTitle: await this.translate.translateI18n('common.confirm.password'),
        buttons: [await this.translate.translateI18n('common.button.ok')]
      });
      alert.present();
    } else {
      let userinfo: string = '用户名：' + username.value + '密码：' + password.value;
      let alert = this.alertCtrl.create({
        title: await this.translate.translateI18n('common.text.title'),
        subTitle: userinfo,
        buttons: [await this.translate.translateI18n('common.button.ok')]
      });
      alert.present();

      this.encryptPassword = await this.loginProvider.getEncryptPassword(password.value);

      console.log('encryptPassword', this.encryptPassword);

      let rs = await this.loginProvider.doLogin(username.value, this.encryptPassword);
      console.log('rs=====', rs.token);
      if(rs){
        this.storage.set('token', rs.token);
        this.navCtrl.push(TabsPage);
      }

    }
  }
}
