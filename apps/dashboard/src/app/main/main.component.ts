import { Component, OnInit } from '@angular/core';
import { PhotosFacade } from '@starter/state';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'starter-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  items$ = this.facade.allPhotos$;
  item$ = this.facade.selectedPhoto$;
  photoToUpload;

  form = new FormGroup({
    name: new FormControl(),
    photo: new FormControl()
  });

  constructor(private facade: PhotosFacade) { }

  ngOnInit() {
    this.facade.loadPhotos();
  }

  submitPhoto(photo) {
    if(photo.id) {
      this.facade.updatePhoto(photo);
    } else {
      this.facade.createPhoto(photo);
    }
    this.selectPhoto(null);
  }

  fileChangeEvent(fileInput) {
    this.photoToUpload = fileInput.target.files[0];
  }

  deletePhoto(id) {
    this.facade.deletePhoto(id);
  }

  selectPhoto(id) {
    this.facade.selectPhoto(id);
  }
}
