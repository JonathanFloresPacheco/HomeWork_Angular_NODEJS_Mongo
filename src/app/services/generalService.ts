import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Subject, Observable} from 'rxjs';

@Injectable()
export class GeneralService {

  constructor(
    private http: HttpClient,
    private titleService: Title
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  // Header alert text
  HeaderMessage = new Subject<string>();
  HeaderMessage$ = this.HeaderMessage.asObservable();

  changeHeaderMessage(data) {
    this.HeaderMessage.next(data);
  }


  // main_url = 'http://localhost:8080';
  base_url = 'http://localhost:8080/api';
  main_url = '/';
  // base_url = '/api';

  getmatery(): Observable<any>{
    return this.http.get(this.base_url+ '/matery/getmatery');
  }

  filterSearchTeachers(matery) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json; charset=utf-8');
    let objFilterSearch = {
      'matery': matery
    }
    console.log(objFilterSearch);
    return this.http.post(this.base_url + '/teachers/filterSearchTeachers', objFilterSearch);
  }
  homeworkRegistration(homework){
    return this.http.post(this.base_url +  '/listjobs/homeworkRegistration',homework) ;
  }
  gethomework(): Observable<any>{
    return this.http.get(this.base_url+ '/listjobs/gethomework');
  }
  deletehomework(idhomework):Observable<any>{
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.base_url+ '/listjobs/deletehomework/'+idhomework);
  }
}