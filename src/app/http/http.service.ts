import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, ConnectionBackend, Request, RequestOptions, Response, RequestOptionsArgs, RequestMethod, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {
  private _refreshObservable: Observable<any>;

  constructor(private backend: ConnectionBackend, private requestOptions: RequestOptions,
    private _router: Router) {
    super(backend, requestOptions);
  }
  delete(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || this.requestOptions;
    options.method = RequestMethod.Delete;
    return this.request(url, options);
  };
  get(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || this.requestOptions;
    options.method = RequestMethod.Get;
    return this.request(url, options);
  };
  head(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || this.requestOptions;
    options.method = RequestMethod.Head;
    return this.request(url, options);
  };
  options(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || this.requestOptions;
    options.method = RequestMethod.Options;
    return this.request(url, options);
  };
  patch(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || this.requestOptions;
    options.method = RequestMethod.Patch;
    return this.request(url, options);
  };
  post(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || this.requestOptions;
    options.method = RequestMethod.Post;
    return this.request(url, options);
  };
  put(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || this.requestOptions;
    options.method = RequestMethod.Put;
    return this.request(url, options);
  };
  request(url: string | Request, options?: RequestOptionsArgs, retry?: boolean): Observable<Response> {
    return super.request(url, options).catch((res: Response) => {
      return Observable.throw(res);
    });
  }
}