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
    this.amcPie()
    this.noAmcPie()
  }

  public warPie() {
    this.lineChart = new Chart(document.getElementById("warPie"), {
      type: 'pie',
      data : {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
              "#F15656",
              "#A84D39",
              "#C77308",
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

  public amcPie() {
    this.lineChart = new Chart(document.getElementById("amcPie"), {
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

  public noAmcPie() {
    this.lineChart = new Chart(document.getElementById("noAmcPie"), {
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
