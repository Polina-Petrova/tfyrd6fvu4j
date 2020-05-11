import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCoreService {

  constructor(private httpClient: HttpClient) {
  }

  protected get(url: string): Observable<any> {
    const fullUrl = this.getBaseUrl() + url;
    return this.httpClient.get(fullUrl);
  }

  private getBaseUrl(): string {
    return environment.baseApiUrl;
  }

}
