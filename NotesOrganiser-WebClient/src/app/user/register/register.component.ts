import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password1: new FormControl(null, Validators.required),
    password2: new FormControl(null, Validators.required)
  })

  constructor(private _router: Router, private _userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password1.value != this.registerForm.controls.password2.value)){
      console.log('Invalid Form');
      return;
    }

    this._userService.insertData(JSON.stringify(this.registerForm.value))
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
