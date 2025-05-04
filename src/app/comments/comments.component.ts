import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { CommentsService } from '../comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  videoId: string = '';
  commentsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private commentService: CommentsService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeCommentsFormGroup();
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
      },
      error: (err) => {
        console.error("Error while posting the comment", err);
      }
    });
  }
}
