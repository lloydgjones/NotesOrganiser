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
  data:any;
  username: String;
  constructor(private _router: Router, private _user: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this.getName(data),
      error=>this._router.navigate(['/login'])
    );
  }

  getName(data){
    this.username = data.username;
  }

  logout(){
    this._user.logout().subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1500,
        progressBar: true
      });

      this._router.navigate(['/login']);},
    );
  }
}
