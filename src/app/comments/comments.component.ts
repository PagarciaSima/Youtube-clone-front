import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { CommentsService } from '../comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentDto } from '../comment-dto';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  videoId: string = '';
  commentsForm!: FormGroup;
  commentsDto: CommentDto[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private commentService: CommentsService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeCommentsFormGroup();
    this.getAllComments();
  }

  getAllComments() {
    this.commentService.getAllComments(this.videoId).subscribe({
      next: (data) => {
        this.commentsDto = data;
      }, error: (err) => {
        console.error("Error while fetching comments", err)
      }
    });
  }

  private initializeCommentsFormGroup() {
    this.commentsForm = this.fb.group({
      comment: ['comment'],
    });
  }

  postComment() {
    const comment = this.commentsForm.get('comment')?.value;
    const commentDto = {
      "commentText": comment,
      "authorId": this.userService.getUserId()
    }

    this.commentService.postComment(commentDto, this.videoId).subscribe({
      next: () => {
        this.matSnackBar.open("Comment Posted Successfully", "OK");
        this.commentsForm.get('comment')?.reset();
        this.getAllComments();
      },
      error: (err) => {
        console.error("Error while posting the comment", err);
      }
    });
  }
}
