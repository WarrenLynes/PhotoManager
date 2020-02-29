import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'starter-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnChanges {

  form: FormGroup;
  photoFile: File;

  @Input() selectedPhoto;
  @Output() savePhoto = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.selectedPhoto) {
      this.buildForm();
    }
  }

  updatePhotoFile(event) {
    this.photoFile = event.target.files[0];
  }

  submitPhoto() {
    this.savePhoto.emit({...this.selectedPhoto, ...this.form.value, photo: this.photoFile})
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.selectedPhoto.name),
      photo: new FormControl('')
    });
  }

}
