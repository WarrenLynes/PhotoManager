import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PhotosService {

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get('/api/photos').pipe(map((x: any) => x.map((xx) => ({...xx, id: xx._id}))) );
  }

  create(name, photo) {
    const formD = new FormData();

    formD.append('photo', photo);
    formD.append('name', name);

    return this.httpClient.post('/api/photos', formD).pipe(map((x: any) => ({...x, id: x._id})));
  }

  getUrlForId(id) {
    return `/api/photos/${id}`;
  }

  update(model) {
    return this.httpClient.put(this.getUrlForId(model.id), model).pipe(map((x:any) => ({...x, id: x._id})));
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId))
  }
}
