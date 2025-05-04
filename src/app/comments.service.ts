import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDto } from './comment-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  postComment(commentDto: CommentDto, videoId: string): Observable<void> {
    return this.httpClient.post<void>(`http://localhost:8080/api/videos/${videoId}/comment`, commentDto);
  }

  getAllComments(videoId: string): Observable<Array<CommentDto>> {
    return this.httpClient.get<CommentDto[]>("http://localhost:8080/api/videos/" + videoId + "/comment");
  }
}
