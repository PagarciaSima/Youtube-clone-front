import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { VideoDto } from '../video-dto';

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {

  saveVideoDetailsForm!: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId = '';
  fileSelected = false;
  videoUrl!: string;
  thumbnailUrl!: string;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService,
              private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params.videoId;
    this.getVideoById();
    this.setForm();
  }

  private setForm() {
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    });
  }

  private getVideoById() {
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.fileSelected = true;
    }
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
    .subscribe({
      next: () => {
        this.matSnackBar.open("Thumbnail Upload Successful", "OK");
      },
      error: (err) => {
        console.error("Error uploading thumbnail:", err);
        const snackBarRef = this.matSnackBar.open("Error uploading thumbnail", "Retry");
        snackBarRef.onAction().subscribe(() => {
          this.onUpload(); 
        });
      }
    });

  }


  saveVideo() {
    // Call the video service to make a http call to our backend
    const videoMetaData: VideoDto = {
      "id": this.videoId,
      "title": this.saveVideoDetailsForm.get('title')?.value,
      "description": this.saveVideoDetailsForm.get('description')?.value,
      "tags": this.tags,
      "videoStatus": this.saveVideoDetailsForm.get('videoStatus')?.value,
      "videoUrl": this.videoUrl,
      "thumbnailUrl": this.thumbnailUrl,
      "likeCount": 0,
      "dislikeCount": 0,
      "viewCount": 0
    }
    this.videoService.saveVideo(videoMetaData).subscribe(data => {
      this.matSnackBar.open("Video Metadata Updated successfully", "OK");
    });
  }
}