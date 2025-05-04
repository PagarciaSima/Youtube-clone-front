import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;

  videoId!: string;
  videoUrl!: string;
  videoAvailable: boolean = false;
  videoTitle: string = '';
  videoDescription: string = '';
  tags: string[] = [];
  likeCount: number = 0;
  dislikeCount: number = 0;
  viewCount: number = 0;
  createdAt: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private userService: UserService
  ) {
    this.videoId = this.activatedRoute.snapshot.params.videoId;
    this.getVideoById();
  }

  ngOnInit(): void {

  }

  private getVideoById() {
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.videoTitle = data.title;
      this.videoDescription = data.description;
      this.tags = data.tags;
      this.videoAvailable = true;
      this.likeCount = data.likeCount;
      this.dislikeCount = data.dislikeCount;
      this.viewCount = data.viewCount;
      this.createdAt = data.createdAt!;
      console.log(data)
    });
  }

  unSubscribeToUser() {
    let userId = this.userService.getUserId();
    this.userService.unSubscribeUser(userId);
    this.showSubscribeButton = true;
    this.showUnSubscribeButton = false;
  }

  subscribeToUser() {
    let userId = this.userService.getUserId();
    this.userService.subscribeToUser(userId);
    this.showSubscribeButton = false;
    this.showUnSubscribeButton = true;
  }

  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe({
      next: (data) => {
        this.likeCount = data.likeCount;
        this.dislikeCount = data.dislikeCount;
      }
    });
  }
  disLikeVideo() {
    this.videoService.disLikeVideo(this.videoId).subscribe({
      next: (data) => {
        this.likeCount = data.likeCount;
        this.dislikeCount = data.dislikeCount;
      }
    });
  }
}
