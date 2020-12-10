import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { DataService } from "../data.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  public selectedPeople: any;
  public buildingdata: any = [];
  public peopledata: any = [];
  public busstopdata: any = [];
  public mymap: any;
  public greenIcon: any = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  public yellowIcon: any = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  public redIcon: any = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  createMap() {
    this.mymap = L.map("map").setView([36.20148611, -115.2525306], 12);
    L.tileLayer(
      "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=TPaLbrO2GprtUxMCwQOu",
      {
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      }
    ).addTo(this.mymap);
  }

  createBldg() {
    let bldgIcon = L.icon({
      iconUrl:
        "https://cdn.iconscout.com/icon/free/png-512/school-education-building-infrastructure-real-estate-emoj-symbol-30762.png",
      iconSize: [38, 40],
      iconAnchor: [18, 25]
    });
    let bldg = L.marker([36.20148611, -115.2525306], {
      icon: bldgIcon
    }).addTo(this.mymap);
    let bldgRadius = L.circle([36.20148611, -115.2525306], {
      color: "",
      fillColor: "aqua",
      fillOpacity: 0.25,
      radius: 1609.34
    }).addTo(this.mymap);
    bldg.bindPopup(
      "ID: " +
        1 +
        "<br/>Name: " +
        "Building 1" +
        "<br/>Location: " +
        [36.20148611, -115.2525306]
    );
  }

  createSafePeople(e) {
    if (e.Status === "Safe") {
      let people = L.marker([e.lat, e.long], {
        icon: this.greenIcon
      })
        .addTo(this.mymap)
        .bindPopup(
          "<br/>Grade: " +
            e.Grade +
            "<br>Status: " +
            e.Status +
            "<br>AbsentPercentage: " +
            e.AbsentPercentage +
            "<br/>Location: " +
            e.lat +
            ", " +
            e.long
        );
    }
  }

  createTrendingPeople(e) {
    if (e.Status === "Trending") {
      let people = L.marker([e.lat, e.long], {
        icon: this.yellowIcon
      })
        .addTo(this.mymap)
        .bindPopup(
          "<br/>Grade: " +
            e.Grade +
            "<br>Status: " +
            e.Status +
            "<br>AbsentPercentage: " +
            e.AbsentPercentage +
            "<br/>Location: " +
            e.lat +
            ", " +
            e.long
        );
    }
  }
  createChronicPeople(e) {
    if (e.Status === "Chronic") {
      let people = L.marker([e.lat, e.long], {
        icon: this.redIcon
      })
        .addTo(this.mymap)
        .bindPopup(
          "<br/>Grade: " +
            e.Grade +
            "<br>Status: " +
            e.Status +
            "<br>AbsentPercentage: " +
            e.AbsentPercentage +
            "<br/>Location: " +
            e.lat +
            ", " +
            e.long
        );
    }
  }

  createBusstops() {
    this.dataservice.getBusstops().subscribe((data) => {
      this.busstopdata = data;
      this.busstopdata.forEach((e) => {
        let busIcon = L.icon({
          iconUrl:
            "https://cdn0.iconfinder.com/data/icons/education-flat-7/128/17_Scholl_Bus-512.png",
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        });
        let bus = L.marker(e.location, {
          icon: busIcon
        }).addTo(this.mymap);
        bus.bindPopup(
          "ID: " +
            e.id +
            "<br/>Building: " +
            "Building 1" +
            "<br/>Location: " +
            e.location
        );
      });
    });
  }

  allMarkers() {
    this.mymap.remove();
    this.createMap();
    this.createBldg();
    this.dataservice.getPeople().subscribe((data) => {
      this.peopledata = data;
      this.peopledata.forEach((e) => {
        this.createSafePeople(e);
        this.createTrendingPeople(e);
        this.createChronicPeople(e);
      });
    });
    this.createBusstops();
    // document.getElementById("grades").value = 1;
  }
  showSafe() {
    this.mymap.remove();
    this.createMap();

    this.createBldg();
    this.dataservice.getPeople().subscribe((data) => {
      this.peopledata = data;
      this.peopledata.forEach((e) => {
        if (e.Status === "Safe") {
          this.createSafePeople(e);
        }
      });
    });
    this.createBusstops();
  }
  showTrending() {
    this.mymap.remove();
    this.createMap();
    this.createBldg();
    this.dataservice.getPeople().subscribe((data) => {
      this.peopledata = data;
      this.peopledata.forEach((e) => {
        if (e.Status === "Trending") {
          this.createTrendingPeople(e);
        }
      });
    });
    this.createBusstops();
  }
  showChronic() {
    this.mymap.remove();
    this.createMap();
    this.createBldg();
    this.dataservice.getPeople().subscribe((data) => {
      this.peopledata = data;
      this.peopledata.forEach((e) => {
        if (e.Status === "Chronic") {
          this.createChronicPeople(e);
        }
      });
    });
    this.createBusstops();
  }

  showBusstops() {
    this.mymap.remove();
    this.createMap();
    this.createBldg();
    this.createBusstops();
  }

  showGrade(g) {
    this.mymap.remove();
    this.createMap();
    this.createBldg();
    this.dataservice.getPeople().subscribe((data) => {
      if (g.target.value === "1") {
        this.peopledata = data;
        this.peopledata.forEach((e) => {
          this.createSafePeople(e);
          this.createTrendingPeople(e);
          this.createChronicPeople(e);
        });
        this.createBusstops();
      }
      this.peopledata = data.filter((e) => e.Grade === Number(g.target.value));
      this.peopledata.forEach((e) => {
        this.createSafePeople(e);
        this.createTrendingPeople(e);
        this.createChronicPeople(e);
      });
    });
  }

  getPerson() {
    this.mymap.remove();
    this.createMap();
    this.createBldg();
    this.createBusstops();
    this.dataservice.getOthers().subscribe((data) => {
      this.peopledata = data;
      let name = document.getElementById("searchName").value;
      this.peopledata.forEach((e) => {
        if (e.name === name) {
          let people = L.marker(e.location, {
            icon: this.greenIcon
          })
            .addTo(this.mymap)
            .bindPopup(
              "ID: " +
                e.id +
                "<br/>Name: " +
                e.name +
                "<br/>Location: " +
                e.location
            );
        }
      });
    });
  }

  constructor(private dataservice: DataService) {}

  ngOnInit() {
    this.createMap();
    this.createBldg();
    this.dataservice.getPeople().subscribe((data) => {
      this.peopledata = data;
      this.peopledata.forEach((e) => {
        this.createSafePeople(e);
        this.createTrendingPeople(e);
        this.createChronicPeople(e);
      });
    });
    this.createBusstops();
  }
}
