import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Highcharts from 'highcharts/highmaps';
import $ from 'jquery';
import { TranslateHelper } from "../../providers/helper/TranslateHelper";
import { ReportProvider } from "../../providers/report/report"
import { MapTs } from "../../assets/js/map"

import { PipesModule } from "../../pipes/pipes.module"

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
   countryList;
   countryTotal;
   regionList;
   regionTotal;
   companyList;
   companyTotal;
   companyName;
   
   token = "eyJhbGciOiJIUzI1NiIsImNhbGciOiJHWklQIn0.H4sIAAAAAAAAAKtWKi5NUrJSMjA0szBR0lFKrShQsjI0NTQ2N7EwtzSvBQDD_GS1IAAAAA.AJoypDUTHW2aiW0bWATaMu3BNeolo_Y-yBQRMK_NYHc";
  constructor(public navCtrl: NavController, public navParams: NavParams,public PipesModule: PipesModule,
    private reportProvider:ReportProvider,private mapTs:MapTs,private translate:TranslateHelper) {
      
  }
   ionViewDidLoad() {
    let that = this;
    let mode = "week";
    this.getCountryList(mode);
    this.getRegionList(mode);
    this.getCompanyList(mode);
    this.getMapData(mode);
    
    $("#reportTab li").click(function(){
      that.countryList = [];
      that.countryTotal = "";
      that.regionList = [];
      that.regionTotal = "";
      that.companyList = [];
      that.companyTotal = "";
      that.companyName = "";
      let isActive = $(this).hasClass('tab-active');
      let text = $(this).text();
      $(".pg-tit span").html(text);
      if(isActive === false){
          $(this).addClass('tab-active');
          $(this).siblings('li').removeClass('tab-active');
      }
    let dateType = $(this).attr("dateType");
     
     if(dateType == "w"){
        mode = "week";
     }
     if(dateType == "m"){
        mode = "month";
     }
     that.getCountryList(mode);
     that.getRegionList(mode);
     that.getCompanyList(mode)
     that.getMapData(mode)
    });
    
  }
  async getCountryList(mode,showLoading=true) {
    await this.reportProvider.getCountrySales(mode, showLoading, this.token).then((data) => {
      if(data){
        this.countryList = data["list"];
        this.countryTotal = data["total"].join("/");
      }
    });
  }
  async getRegionList(mode,showLoading=true) {
    await this.reportProvider.getAreaSales(mode, showLoading, this.token).then((data) => {
      if(data){
        this.regionList = data["list"];
        this.regionTotal = data["total"].join("/");
      }
    });
  }
  async getCompanyList(mode,showLoading=true) {
    await this.reportProvider.getCompanySales(mode, showLoading, this.token).then((data) => {
      if(data["list"].length !== 0){
        this.companyList = data["list"][0]["enterpriseTypes"];
        this.companyName = data["list"][0]["name"];
        this.companyTotal = data["total"].join("/");
      }
    });
  }
  async getMapData(mode,showLoading=true){
    await this.reportProvider.getCountryOneLevelSales(mode, showLoading, this.token).then(async (data) => {
      let mapData = this.mapTs.maps;
      Highcharts.mapChart('AfricaMap', {
        title : {
          text :await this.translate.translateI18n('report.title')
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },
        colorAxis: {
          min: 0,
          stops: [
            [0, '#ff5839'],
            [0.5, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
          ]
        },
        series : [{
          data : data,
          mapData: mapData,
          joinBy: 'name',
          name: 'sales',
          states: {
            hover: {
              color: '#a4edba'
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }]
      });
    });
  }
}