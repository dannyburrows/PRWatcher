import { Component } from '@angular/core';
import { RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { environment } from '../environments/environment';

import { PullRequest } from './pull-request';
import { Repo } from './repo';

import { HttpService } from './http/http.service';

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  repos: Repo[];
  private _baseApi = 'https://api.github.com/repos/monscierge/';

  constructor(private _http: HttpService) {
    this.repos = new Array<Repo>();
    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Authorization', `token ${environment.githubKey}`);
    this._addRepos();
    this.repos.forEach(r => {
      this._http.get(`${r.URL}`, options)
        .map((res) => {
          return res.json();
        })
        .subscribe((repository: any) => {
          r.Name = repository.name;
          r.Html = repository.html_url;
        });
      this._http.get(`${r.URL}/pulls`, options)
        .map((res: any): PullRequest[] => {
          let pulls = new Array<PullRequest>();
          res.json().forEach(pull => {
            let pr = new PullRequest();
            pr.Id = pull.id;
            pr.URL = pull.html_url;
            pr.Title = pull.title;
            pr.Base = pull.base.label;
            pr.State = pull.state;
            pr.User = pull.user.login;
            pr.Avatar = pull.user.avatar_url;
            pulls.push(pr);
          });
          return pulls;
        })
        .subscribe((pulls: PullRequest[]) => {
          r.PRs = pulls;
        });
      IntervalObservable.create(60000).subscribe(t => {
        this._http.get(`${r.URL}/pulls`, options)
          .map((res: any): PullRequest[] => {
            let pulls = new Array<PullRequest>();
            res.json().forEach(pull => {
              let pr = new PullRequest();
              pr.Id = pull.id;
              pr.URL = pull.html_url;
              pr.Title = pull.title;
              pr.Base = pull.base.label;
              pr.State = pull.state;
              pr.User = pull.user.login;
              pr.Avatar = pull.user.avatar_url;
              pulls.push(pr);
            });
            return pulls;
          })
          .subscribe((pulls: PullRequest[]) => {
            r.PRs = pulls;
          });
      });
    });
  }

  nav(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  private _addRepos() {
    this.repos.push({
      URL: `${this._baseApi}cms`,
      Name: '',
      Html: '',
      PRs: new Array<PullRequest>()
    });
    this.repos.push({
      URL: `${this._baseApi}connect-analytics`,
      Name: '',
      Html: '',
      PRs: new Array<PullRequest>()
    });
    this.repos.push({
      URL: `${this._baseApi}EventTablet`,
      Name: '',
      Html: '',
      PRs: new Array<PullRequest>()
    });
    this.repos.push({
      URL: `${this._baseApi}monscierge`,
      Name: '',
      Html: '',
      PRs: new Array<PullRequest>()
    });
    this.repos.push({
      URL: `${this._baseApi}monscierge-requests`,
      Name: '',
      Html: '',
      PRs: new Array<PullRequest>()
    });
    this.repos.push({
      URL: `${this._baseApi}monscierge-salto`,
      Name: '',
      Html: '',
      PRs: new Array<PullRequest>()
    });
    this.repos.push({
      URL: `${this._baseApi}MonsciergeWebSockets`,
      Name: '',
      Html: '',
      PRs: new Array<PullRequest>()
    });
  }
}
