import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@starter/material';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [NotFoundComponent, PhotoFormComponent],
  exports: [NotFoundComponent, PhotoFormComponent],
})
export class UiModule {}
