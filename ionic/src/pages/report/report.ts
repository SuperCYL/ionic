import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Highcharts from 'highcharts/highmaps';
import $ from 'jquery';
import { TranslateHelper } from "../../providers/helper/TranslateHelper";
import { ReportProvider } from "../../providers/report/report"
import { MapTs } from "../../assets/js/map"

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
   
  constructor(public navCtrl: NavController, public navParams: NavParams,private reportProvider:ReportProvider,private mapTs:MapTs,private translate:TranslateHelper) {
  }
// 初始化数据加载
   ionViewDidLoad() {
    let that = this;
    let mode = "week";
    this.getCountryList(mode);
    this.getRegionList(mode);
    this.getCompanyList(mode);
    this.getMapData(mode);
    
    $("#reportTab li").click(function(){
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
// 获取国家销量
  async getCountryList(mode) {
    await this.reportProvider.getCountrySales(mode).then((data) => {
      this.countryList = data["list"];
      this.countryTotal = data["total"].join("/");
      console.log(this.countryTotal);
    });
  }
// 获取区域销量
  async getRegionList(mode) {
    await this.reportProvider.getAreaSales(mode).then((data) => {
      this.regionList = data["list"];
      this.regionTotal = data["total"].join("/");
      console.log(this.regionTotal);
    });
  }
// 获取事业部销量
  async getCompanyList(mode) {
    await this.reportProvider.getCompanySales(mode).then((data) => {
      this.companyList = data["list"][0]["enterpriseTypes"];
      this.companyName = data["list"][0]["name"];
      this.companyTotal = data["total"].join("/");
      console.log(this.companyName);
    });
  }
// 非洲地图
  async getMapData(mode){
      await this.reportProvider.getCountryOneLevelSales(mode).then((data) => {
          console.log(data);
        let mapData = this.mapTs.maps;
        Highcharts.mapChart('AfricaMap', {
            title : {
              text : this.translate.translateI18n('report.title')
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