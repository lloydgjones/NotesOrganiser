import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/services/note.service';
import { Note } from '../../model/note.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  note = new Note();
  id:any;
  data:any;
  constructor(private noteService: NoteService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  form = new FormGroup({
    name: new FormControl(''),
    content: new FormControl('')
  })

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getNoteData();
  }

  getNoteData(){
    this.noteService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.note = this.data;
      this.form = new FormGroup({
        name: new FormControl(this.note.name),
        content: new FormControl(this.note.content)
      })
    })
  }

  editData() {
    this.noteService.editData(this.id, this.form.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1500,
        progressBar: true
      });
    });
  }

  deleteData(id) {
    this.noteService.deleteData(id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message),
      {
        timeOut: 1500,
        progressBar: true
      });
      this.getNoteData();
      this.router.navigateByUrl('/');
    });
  }
}
