import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  fileUrl = 'http://localhost:3000/multifiles';


  constructor(private httpClient: HttpClient) { }
  upload(file: File): Observable<HttpEvent<any>> {
    const formdata = new FormData();
    formdata.append('file', file);


    const req = new HttpRequest('POST', `${this.fileUrl}/upload`, formdata, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFiles() {
    return this.httpClient.get<{ files: any }>(`${this.fileUrl}/files`);
  }
}
