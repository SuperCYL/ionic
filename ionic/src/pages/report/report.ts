import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

import { ReportProvider } from "../../providers/report/report"

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
  menuList;
  constructor(public navCtrl: NavController, public navParams: NavParams,private reportProvider:ReportProvider) {
  }

  ionViewDidLoad() {
    $("#reportTab li").click(function(){
      var isActive = $(this).hasClass('tab-active');
      var text = $(this).text();
      $(".pg-tit span").html(text);
      if(isActive === false){
          $(this).addClass('tab-active');
          $(this).siblings('li').removeClass('tab-active');
      }
    });
    let mode = "week";
    
    let data = this.reportProvider.getCountrySales(mode);
    this.menuList = data;
    console.log(data);
  }
}
