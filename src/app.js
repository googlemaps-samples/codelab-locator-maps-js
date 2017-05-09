/*
 * Copyright 2017 Google Inc. All rights reserved.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// Style credit: https://snazzymaps.com/style/1/pale-dawn
const mapStyle = [
  {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "lightness": 33
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      {
        "color": "#f2e5d4"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c5dac6"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c5c6c6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e4d7c6"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fbfaf7"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#acbcc9"
      }
    ]
  }
];

function initMap() {

  // Create the map.
  const map = new google.maps.Map(document.getElementsByClassName('map')[0], {
    zoom: 7,
    center: {lat: 52.632469, lng: -1.689423},
    styles: mapStyle
  });

  // Load the stores GeoJSON onto the map.
  map.data.loadGeoJson('stores.json');

  // Define the custom marker icons, using the store's "category".
  map.data.setStyle(feature => {
    return {
      icon: {
        url: `img/icon_${feature.getProperty('category')}.png`,
        scaledSize: new google.maps.Size(64, 64)
      }
    };
  });

  const apiKey = 'YOUR_API_KEY';
  const infoWindow = new google.maps.InfoWindow();

  // Show the information for a store when its marker is clicked.
  map.data.addListener('click', event => {

    let category = event.feature.getProperty('category');
    let name = event.feature.getProperty('name');
    let description = event.feature.getProperty('description');
    let hours = event.feature.getProperty('hours');
    let phone = event.feature.getProperty('phone');
    let position = event.feature.getGeometry().get();
    let content = `
      <img style="float:left; width:200px; margin-top:30px" src="img/logo_${category}.png">
      <div style="margin-left:220px; margin-bottom:20px;">
        <h2>${name}</h2><p>${description}</p>
        <p><b>Open:</b> ${hours}<br/><b>Phone:</b> ${phone}</p>
        <p><img src="https://maps.googleapis.com/maps/api/streetview?size=350x120&location=${position.lat()},${position.lng()}&key=${apiKey}"></p>
      </div>
    `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
  });

}
