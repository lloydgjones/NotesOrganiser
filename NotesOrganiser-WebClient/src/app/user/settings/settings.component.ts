import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username: String='_____';
  constructor(private _router: Router, private _user: UserService, private toastr: ToastrService) {
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
      data => {this.toastr.success(JSON.stringify(200), JSON.stringify(data),
      {
        timeOut: 1500,
        progressBar: true
      }); this._router.navigate(['/login']);},
      error => this.toastr.error(JSON.stringify(401), JSON.stringify(error),
      {
        timeOut: 1500,
        progressBar: true
      })
    );
  }
}
