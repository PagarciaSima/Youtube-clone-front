import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string = '';

  constructor(private httpClient: HttpClient) { }

  subscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`http://localhost:8080/api/user/subscribe/${userId}`, null);
  }

  unSubscribeUser(userId: string) {
    return this.httpClient.post<boolean>(`http://localhost:8080/api/user/unSubscribe/${userId}`, null);
  }

  registerUser() {
    this.httpClient.post('http://localhost:8080/api/user/register/', null, { responseType: 'text' })
    .subscribe({
      next: (data: string) => {
        this.userId = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  getUserId(): string {
    return this.userId;
  }
}
