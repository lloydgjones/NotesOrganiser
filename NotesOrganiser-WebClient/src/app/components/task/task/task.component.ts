import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { TaskService } from 'src/app/services/task/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  data: any;
  email: String;
  tasks: any[];
  constructor(private _router: Router, private _user: UserService, private taskService: TaskService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );
  }

  getAccount(data){
    this.email = data.email;
    this.getData();
  }

  getData() {
    this.taskService.getData().subscribe(res => {
      this.tasks = Object.keys(res).map(index => { let task = res[index]; if (task.account == this.email) { return task; }});
    });
  }
}
