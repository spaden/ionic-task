import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';  
import * as CanvasJS from '../../aditional_assets/canvasjs.min';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage  implements OnInit  {
  lineChart: any;
 
  
  constructor(private route: Router,public alertCtrl: AlertController) {
    
  }
  
  ngOnInit() {
    
  } 
  
  ngAfterViewInit(){
    this.warPie()
    //this.amcPie()
    //this.noAmcPie()
  }

  public warPie() {
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
    document.getElementById("chartName").innerHTML = "AMC"

    this.lineChart = new Chart(document.getElementById("chartContainer"), {
      type: 'pie',
      data : {
        datasets: [{
            data: [40, 20, 40],
            backgroundColor: [
              "#FF6384",
              "#63FF84",
              "#84FF63",
          ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
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

  public noAmcPie() {
    document.getElementById("chartName").innerHTML = "No AMC"

    this.lineChart = new Chart(document.getElementById("chartContainer"), {
      type: 'pie',
      data : {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
              "#FF6384",
              "#63FF84",
              "#84FF63",
          ]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
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






  

}
