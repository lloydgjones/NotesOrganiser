import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  isDoneLoading: boolean = false;
  data: any;
  email: String;
  submitted=false;
  addTaskForm: FormGroup;

  constructor(private _router: Router, private _user: UserService, private taskService: TaskService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  createForm() {
    this.addTaskForm = this.formBuilder.group({
      account: [''],
      name: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(300)]],
      time: [''],
      tags: [''],
      importance: ['']
    });
    this.isDoneLoading = true;
  }

  ngOnInit(): void {
    this.createForm();

    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
    this.addTaskForm.controls['account'].setValue(this.email);
  }

  get f() {
    return this.addTaskForm.controls;
  }
  insertData() {
    this.submitted=true;

    if(this.addTaskForm.invalid) { return; }

    this.addTaskForm.value.tags = this.addTaskForm.value.tags.split(',');

    this.taskService.insertData(this.addTaskForm.value).subscribe(
      res => {
        this.data = res;
        this.toastr.success(this.data.message, "Success", {
          timeOut: 2000,
          progressBar: true,
          positionClass: "toast-bottom-right"
        });
        this._router.navigateByUrl('/tasks');
      }
    );
  }
}
