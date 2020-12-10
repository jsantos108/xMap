import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  url = "https://yrl3n-3000.sse.codesandbox.io";
  constructor(private http: HttpClient) {}
  getBldgs() {
    return this.http.get(this.url + "/buildings");
  }

  getPeople() {
    return this.http.get(this.url + "/people");
  }

  getBusstops() {
    return this.http.get(this.url + "/busstops");
  }

  getOthers() {
    return this.http.get(this.url + "/others");
  }
}
