import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'http://bdc.arequipa.space/api';

  constructor(private http: HttpClient) {}

  getMessage() {
    return this.http.get(this.url, { responseType: 'text' });
  }
  login(data: any) {
  return this.http.post(this.url + '/login', data);
  }
  getUsers() {
  return this.http.get(this.url + '/users');
}

createUser(data: any) {
  return this.http.post(this.url + '/users', data);
}

deleteUser(id: string) {
  return this.http.delete(this.url + '/users/' + id);
}
updateUser(id: string, data: any) {
  return this.http.put(this.url + '/users/' + id, data);
}
}