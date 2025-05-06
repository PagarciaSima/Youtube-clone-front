import { Component, OnInit } from '@angular/core';
import { VideoDto } from '../video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyVideos: Array<VideoDto> = []

  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.videoService.getVideoHistory().subscribe({
      next: (data) => {
        this.historyVideos = data;
      }
    });
  }
}
