import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.css']
})
export class ListPage implements OnInit {

  constructor() {
  
  }

  ngOnInit() {
    this.list()
  }

  list(){
    var toggler = document.getElementsByClassName("caret")
    var i

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active")
        this.classList.toggle("caret-down")
      })
    }
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
