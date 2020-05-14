import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  
  userEmail = "rs.ravindra@tcs.com"
  userMobNum= 7588743779
  userlandlinenum = 2267795334

  constructor() { }

  ngOnInit() {
  }

}
