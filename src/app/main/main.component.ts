import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'User Management',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Asset Management',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Operation Management',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Overview',
      url: '/list',
      icon: 'list'
    }
  ];
  constructor() { }

  ngOnInit() {}

}
