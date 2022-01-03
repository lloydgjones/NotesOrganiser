import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get(environment.apiUrl+'/notes');
  }

  getDataById(id) {
    return this.httpClient.get(environment.apiUrl+'/note/'+id);
  }

  insertData(data) {
    return this.httpClient.post(environment.apiUrl+'/note/add', data);
  }

  editData(id, data) {
    return this.httpClient.put(environment.apiUrl+'/note/update/'+id, data);
  }

  deleteData(id) {
    return this.httpClient.delete(environment.apiUrl+'/note/'+id);
  }
}
