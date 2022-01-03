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
  data:any;
  registerForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password1: new FormControl(null, Validators.required),
    password2: new FormControl(null, Validators.required)
  })
  constructor(private _router: Router, private _user: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this._router.navigate(['/settings'])
    );
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password1.value != this.registerForm.controls.password2.value)){
      console.log('Invalid Form');
      return;
    }

    this._user.insertData(JSON.stringify(this.registerForm.value)).subscribe(res => {
      this.data = res;

      if (this.data.code == 201) {
        this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
          timeOut: 1500,
          progressBar: true
        });

        this._router.navigate(['/login']);
      }

      else {
        this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
          timeOut: 1500,
          progressBar: true
        });
      }},
    );
  }
}
