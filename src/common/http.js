import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

class Http {
    baseUrl = 'http://localhost:8000/';
    get token() {
        return localStorage.getItem('token') || null;
    };


    get headers() {
        const hds = {};
        if (this.token) {
            hds.Authorization = `Bearer ${this.token}`;
        }
        return hds;
    }


    buildUrl(url) {
        return this.baseUrl + url;
    }

    get(url) {
        return ajax({url: this.buildUrl(url), method: 'get', headers: this.headers, crossDomain: true})
            .pipe(map(res => res.response))
            .toPromise();
    }

    post(url, body) {
        return ajax({url: this.buildUrl(url), method: 'post', body, headers: this.headers, crossDomain: true})
            .pipe(map(res => res.response))
            .toPromise();
    }

    delete(url) {
        return ajax({url: this.buildUrl(url), method: 'delete', headers: this.headers, crossDomain: true})
            .pipe(map(res => res.response))
            .toPromise();
    }

    patch(url, body) {
        return ajax({url: this.buildUrl(url), method: 'patch', body, headers: this.headers, crossDomain: true})
            .pipe(map(res => res.response))
            .toPromise();
    }
}

const http = new Http();
export default http;