import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })

  constructor(private _router: Router, private _user: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this._router.navigate(['/settings'])
    );
  }

  login(){
    if(!this.loginForm.valid){
      this.toastr.error("Invalid Form", "Error", {
        timeOut: 2000,
        progressBar: true,
        positionClass: "toast-bottom-right"
      });
      return;
    }

    this._user.login(JSON.stringify(this.loginForm.value)).subscribe(
      res => {
        this.data = res;
        this.toastr.success(JSON.stringify(this.data.message), "Success", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });

        this._router.navigate(['/settings']);
      }
    );
  }
}
