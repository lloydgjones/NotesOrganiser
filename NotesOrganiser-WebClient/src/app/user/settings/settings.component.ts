import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username: String='_____';
  constructor(private _router: Router, private _user: UserService) {
    this._user.getUser()
    .subscribe(
      data=>this.getName(data),
      error=>this._router.navigate(['/login'])
    )
  }

  ngOnInit(): void {
  }

  getName(data){
    this.username = data.username;
  }

  logout(){
    this._user.logout()
    .subscribe(
        data => {console.log(data); this._router.navigate(['/login'])},
        error => console.error(error)
    );
  }
}
