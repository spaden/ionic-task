import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';  
import * as CanvasJS from '../../aditional_assets/canvasjs.min';
import { Chart } from 'chart.js';
import { IonRouterOutlet, Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage  implements OnInit  {
  clicked = 1
  lineChart: any;
  @ViewChild(IonRouterOutlet, {static:false}) routerOutlet: IonRouterOutlet;
  
  constructor(private router: Router,public alertCtrl: AlertController,private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/home') {
        
        if(window.confirm("Do you want to exit app")){
          navigator['app'].exitApp();
        }
       
        
      } 
    });
  }
  
  ngOnInit() {
    
  } 
  
  ngAfterViewInit(){
    this.totAssetsPie()
    //this.amcPie()
    //this.noAmcPie()
  }

  public totAssetsPie() {
    //document.getElementById("chartName").innerHTML = "Total Assets"
    this.lineChart = new Chart(document.getElementById("chartContainer"), {
      type: 'pie',
      data : {
        datasets: [{
            data: [25,40,35],
            backgroundColor: [
              "#FF6384",
              "#63FF84",
              "#84FF63"
          ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Warranty',
            'AMC',
            'NO AMC/ No Warranty'
        ]
    },
    options: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: "#000080",
        }
      },  
      responsive: true,
      maintainAspectRatio: false
  }  
  });
  }

  public amcPie() {
    //document.getElementById("chartName").innerHTML = "AMC"

    this.lineChart = new Chart(document.getElementById("chartContainer"), {
      type: 'pie',
      data : {
        datasets: [{
            data: [30, 70],
            backgroundColor: [
              "#63FF84",
              "#84FF63",
          ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'AMC Due',
            'NO Due'
        ]
    },
    options: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: "#000080",
        }
      },  
      responsive: true,
      maintainAspectRatio: false
  }  
  });
  }

  public pmPie() {
    //document.getElementById("chartName").innerHTML = "No AMC"

    this.lineChart = new Chart(document.getElementById("chartContainer"), {
      type: 'pie',
      data : {
        datasets: [{
            data: [40, 60],
            backgroundColor: [
              "#FF6384",
              "#63FF84"
          ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Pm Pending',
            'Pm Complete'
        ]
    },
    options: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: "#000080",
        }
      },  
      responsive: true,
      maintainAspectRatio: false
  }  
  });
  }
  
  public asbreakPie(){

    this.lineChart = new Chart(document.getElementById("chartContainer"), {
      type: 'pie',
      data : {
        datasets: [{
            data: [70, 30],
            backgroundColor: [
              "#FF6384",
              "#63FF84"
          ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Asset Breakdown',
            'Asset Complete'
        ]
    },
    options: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: "#000080",
        }
      },  
      responsive: true,
      maintainAspectRatio: false
  }  
  });
  }

  public onChange(value){
    console.log(value.detail.value)
    var query = value.detail.value
    if(query == "TOT"){
      this.totAssetsPie()
    }else if(query == "AMCNON"){
      this.amcPie()
    }else if(query == "PMPC"){
      this.pmPie()
    }else if(query == "ASSTBR"){
      this.asbreakPie()
    }
  } 

  
  srchBtn(){

    console.log("Clicked")
    
    if(this.clicked == 1){
      this.clicked = 2
      document.getElementById("srchId").style.display="block"
      document.getElementById("title").style.display= "none"
    }
    else if (this.clicked ==2){
      document.getElementById("srchId").style.display="none"
      document.getElementById("title").style.display= "block"
      var srchVal = (<HTMLInputElement>document.getElementById("srchId")).value
      
        if(srchVal !== ""){
            console.log(srchVal)
            this.router.navigate(['/list',srchVal])  
        }
        this.clicked = 1
<<<<<<< HEAD
        //document.getElementById("srchId").value = ""
    }
       
      
 
      
     


    //this.router.navigate(['/list', 'y']);
  }

  qrBtn(){
    this.router.navigateByUrl('scan');
   }

  

}
