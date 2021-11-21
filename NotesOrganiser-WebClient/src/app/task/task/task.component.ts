import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks:any;
  data:any;
  constructor(private taskService:TaskService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taskService.getData().subscribe(res => {
      console.log(res);
      this.tasks = res;
    });
  }
}
