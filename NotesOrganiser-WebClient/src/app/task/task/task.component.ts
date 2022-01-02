import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks:any[];
  allTasks:any[];
  data:any;
  email: String;
  constructor(private _router: Router, private _user: UserService, private taskService: TaskService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this._user.getUser()
    .subscribe(
      data=>this.getAccount(data),
      error=>this._router.navigate(['/login'])
    );

    this.getData();
  }

  getAccount(data){
    this.email = data.email;
  }

  getData() {
    this.taskService.getData().subscribe(res => {
      this.allTasks = Object.keys(res).map(key => ({type: key, value: res[key]}));
      this.tasks = this.allTasks.filter(task => task.account == this.email);
    });
  }
}
