import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task/task.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task = new Task();
  id:any;
  data:any;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  form = new FormGroup({
    name: new FormControl(''),
    content: new FormControl('')
  })

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getTaskData();
  }

  getTaskData(){
    this.taskService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.task = this.data;
      this.form = new FormGroup({
        name: new FormControl(this.task.name),
        content: new FormControl(this.task.content)
      })
    })
  }

  editData() {
    this.taskService.editData(this.id, this.form.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1500,
        progressBar: true
      });
    });
  }

  deleteData(id) {
    this.taskService.deleteData(id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1500,
        progressBar: true
      });
      this.getTaskData();
      this.router.navigateByUrl('/tasks');
    });
  }
}
