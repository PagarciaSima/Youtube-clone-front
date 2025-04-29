import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  videoId!: string;
  videoUrl!: string;
  videoAvailable: boolean = false;
  videoTitle: string = '';
  videoDescription: string = '';
  tags: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService
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
    });
  }
}
