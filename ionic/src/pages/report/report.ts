import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
import {TranslateHelper} from "../../providers/helper/TranslateHelper";

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate:TranslateHelper) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
    $("#reportTab li").click(function(){
      var isActive = $(this).hasClass('tab-active');
      if(isActive === false){
          $(this).addClass('tab-active');
          $(this).siblings('li').removeClass('tab-active');
      }
      var text = $(this).text();
      if(text == 'Last Week'){
        $(".pg-tit").html("Heat Map in the Last Week")
      }
      if(text == 'Last Month'){
        $(".pg-tit").html("Heat Map in the Last Month")
      }
    })
  }
}
