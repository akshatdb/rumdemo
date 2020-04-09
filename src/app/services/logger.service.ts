import { Injectable } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { timeInterval, tap, filter, take } from 'rxjs/operators';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private router: Router, private http: HttpClient) { }
  private info = {};
  private geoApiUrl = 'http://geoapi-test-geoapi.apps.us-east-2.starter.openshift-online.com/';
  // private timingHandler;
  // private navigationHandler;
  // private intervalCount = 0;
  // private routeCountAvg = {};
  // private routeCount = {};
  refreshData() {
    let that = this;
    this.getPublicIP();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        that.info['locationData'] = position;
      }, function () {
        that.info['locationData'] = 'Not available'
      });
    } else {
      // Browser doesn't support Geolocation
      that.info['locationData'] = 'Not available'
      console.log('position not available');
    }

    this.info['timeOpened'] = new Date();
    var split = new Date().toString().split(" ");
    this.info['timezone'] = split[split.length - 2] + " " + split[split.length - 1];
    this.info['referrer'] = document.referrer;
    this.info['browserName'] = this.getBrowser();
    this.info['browserEngine'] = navigator.product;
    this.info['browserVersion1a'] = navigator.appVersion;
    this.info['browserVersion1b'] = navigator.userAgent;
    this.info['browserLanguage'] = navigator.language;
    this.info['browserOnline'] = navigator.onLine;
    this.info['javaEnabled'] = navigator.javaEnabled();
    this.info['cookieEnabled'] = navigator.cookieEnabled;
    this.info['cookies'] = document.cookie;
    this.info['localStorage'] = localStorage;
    this.info['sessionStorage'] = sessionStorage;
    this.info['device'] = this.isMobile() ? 'mobile' : 'desktop';
    this.info['resolution'] = window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio;
    this.info['operatingSystem'] = this.isMobile() ? this.getMobileOperatingSystem() : navigator.platform;
    // alert('device:'+this.info['device']+',os:'+this.info['operatingSystem'] + ',resolution:'+this.info['resolution']);
    var findIP = new Promise(r => { var w = window, a = new (w['RTCPeerConnection'] || w['mozRTCPeerConnection'] || w['webkitRTCPeerConnection'])({ iceServers: [] }), b = () => { }; a.createDataChannel(""); a.createOffer(c => a.setLocalDescription(c, b, b), b); a.onicecandidate = c => { try { c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r) } catch (e) { } } })
    /*Usage example*/
    findIP.then(ip => that.info['localip'] = ip).catch(e => console.error(e));

  }
  getInfo() {
    return this.info;
  }


  private getBrowser() {

    // Firefox 1.0+
    var isFirefox = this.isFirefox();

    // Safari 3.0+ "[object HTMLElementConstructor]"
    var isSafari = this.isSafari();

    // Internet Explorer 6-11
    var isIE = this.isIE();

    // Edge 20+
    var isEdge = !isIE && !!window['StyleMedia'];

    // Chrome 1 - 71
    var isChrome = !!window['chrome'] && (!!window['chrome'].webstore || !!window['chrome'].runtime);

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window['CSS'];

    //Opera
    var isOpera = this.isOpera();

    if (isOpera)
      return 'Opera';
    if (isFirefox)
      return 'Firefox';
    if (isSafari)
      return 'Safari 3.0+';
    if (isIE)
      return 'Internet Explorer 6-11';
    if (isEdge)
      return 'Edge 20+';
    if (isChrome)
      return 'Chrome';
    if (isBlink)
      return 'Blink';
  }
  private isOpera(): boolean {
    return (!!window['opr'] && !!window['opr'].addons) || !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0;
  }

  private isFirefox(): boolean {
    //noinspection TypeScriptUnresolvedVariable
    return ("InstallTrigger" in window) || typeof window['InstallTrigger'] !== 'undefined';
  }

  private isSafari(): boolean {
    return /constructor/i.test(String(window['HTMLElement'])) || ((p): boolean => {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || window['safari'].pushNotification);
  }

  private isIE(): boolean {
    return /*@cc_on!@*/false || !!window.document['documentMode'];
  }

  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window['opera'];

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window['MSStream']) {
      return "iOS";
    }

    return "unknown";
  }

  isMobile() {
    let userAgent = navigator.userAgent || navigator.vendor || window['opera'];
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent))
      return true;
    return false;
  }
  logLoadTime() {
    this.info['apploadTime'] = (Date.now() - window['timerStart']) / 1000;
  }

  registerTimer() {

    const events = [
      'click',
      'scroll',
      'keyup',
      'wheel',
      'mousemove'
    ];
    const eventStreams = events.map((ev) => fromEvent(document, ev));
    const allEvents$ = merge(...eventStreams);
    let that = this;
    allEvents$
      .pipe(
        timeInterval(),
        filter(i => i.interval > 1000)
      )
      .subscribe(
        i => {
          that.logIdleTime(i.interval / 1000);
        }
      );

    //Time on a route

    this.router.events.pipe(
      filter(ev => ev instanceof NavigationStart),
      timeInterval()
    )
      .subscribe(
        i => {
          that.logRouteChange(i);
          this.log('route');
        }
      );
    this.router.events.subscribe(route => {
      if (route instanceof NavigationStart) {
        this.info['lastRouteChange'] = { from: this.router.url, to: route.url };
        this.info['lastStartingRoute'] = this.router.url;
        this.info['lastEndingRoute'] = route.url;
      }
    })
  }

  logIdleTime(interval) {
    let currentPath = this.router.url;
    this.info['lastIdleTime'] = {
      'route': currentPath,
      'time': interval
    }
    // let routeIntervalCount = this.routeCountAvg[currentPath] ? this.routeCountAvg[currentPath] : 0;
    // if (!this.info['averageRouteIdleTime'])
    //   this.info['averageRouteIdleTime'] = {};
    // //idle time logger
    // this.info['averageIdleTime'] = ((this.info['averageIdleTime'] || 1) * this.intervalCount + interval) / (++this.intervalCount);
    // this.info['averageRouteIdleTime'][currentPath] = ((this.info['averageRouteIdleTime'][currentPath] || 1) * routeIntervalCount + interval) / (routeIntervalCount + 1);
    // this.routeCountAvg[currentPath] = this.routeCountAvg[currentPath] ? this.routeCountAvg[currentPath] + 1 : 1;
  }
  logRouteChange(event) {
    let currentPath = this.router.url;
    let interval = event.interval / 1000;
    this.info['lastTimeSpentOnRoute'] = {
      'route': currentPath,
      'time': interval
    }
    // let routeIntervalCount = this.routeCount[currentPath] ? this.routeCount[currentPath] : 0;
    // if (!this.info['averageRouteTime'])
    //   this.info['averageRouteTime'] = {};
    // this.info['averageRouteTime'][currentPath] = ((this.info['averageRouteTime'][currentPath] || 1) * routeIntervalCount + interval) / (routeIntervalCount + 1);
    // this.routeCount[currentPath] = this.routeCount[currentPath] ? this.routeCount[currentPath] + 1 : 1;
  }

  logClick(el) {
    let currentPath = this.router.url;
    let labelName = el.label;
    if (el.nocount) {
      if (!this.info['clickOnRoute'])
        this.info['clickOnRoute'] = {};
      if (!this.info['clickOnRoute'][currentPath])
        this.info['clickOnRoute'][currentPath] = {};
      //CHANGED PART  
      if (this.info['clickOnRoute'][currentPath][labelName]) {
        this.info['clickOnRoute'][currentPath][labelName] = {
          'type': labelName,
          'count': this.info['clickOnRoute'][currentPath][labelName].count,
          'lastValue': el.value
        }
      }
      else {
        this.info['clickOnRoute'][currentPath][labelName] = {
          'type': labelName,
          'count': 0,
          'lastValue': el.value
        }
      }
      //REMOVE THIS
      // this.info['clickOnRoute'][currentPath][labelName] = this.info['clickOnRoute'][currentPath][labelName] ? this.info['clickOnRoute'][currentPath][labelName] : 0;
    }
    else {
      if (!this.info['clickOnRoute'])
        this.info['clickOnRoute'] = {};
      if (!this.info['clickOnRoute'][currentPath])
        this.info['clickOnRoute'][currentPath] = {};
      if (this.info['clickOnRoute'][currentPath][labelName]) {
        this.info['clickOnRoute'][currentPath][labelName] = {
          'type': labelName,
          'count': this.info['clickOnRoute'][currentPath][labelName].count + 1,
          'lastValue': el.value
        }
      }
      else {
        this.info['clickOnRoute'][currentPath][labelName] = {
          'type': labelName,
          'count': 1,
          'lastValue': el.value
        }
      }
      //REMOVE THIS
      //this.info['clickOnRoute'][currentPath][labelName] = (this.info['clickOnRoute'][currentPath][labelName] ? this.info['clickOnRoute'][currentPath][labelName] : 0) + 1;
      this.info['lastClick'] = el;
      this.log('click');
    }
  }

  logHover(el) {
    this.info['lastHover'] = el;
    this.log('hover');
  }

  log(type = 'default', imageflag = true) {
    if (imageflag) {
      setTimeout(() => {
        this.captureScreen().subscribe(image => {
          // this.info['latestCapture'] = image;
          let form = new FormData();
          form.append('file', image);
          form.append('data', JSON.stringify(this.info));
          // this.http.post('http://localhost:8080', form).subscribe(res => console.log(res));
          console.log(this.info);
        })
      }, 1000);

    } {
      this.info['latestPerformanceObj'] = window.performance.toJSON().timing;
      console.log(type, this.info);
    }
  }


  //API Calls

  getPublicIP() {
    this.http.get(this.geoApiUrl, { responseType: 'json' }).subscribe((res: any) => {
      if (res.data) {
        this.info['publicIp'] = res.data.ip;
        this.info['ipbasedLocationData'] = {
          'city': res.data.location.city,
          'country': res.data.location.country,
          'latlong': res.data.location.ll,
          'accuracy': res.data.location.area
        }
      }
    }, (error: any) => {
      console.log('GEOIP failed');
    })
  }


  captureScreen() {
    let image: Subject<any> = new Subject();
    html2canvas(document.body).then(canvas => {
      let imgData = canvas.toDataURL("image/png");
      image.next(this.dataURItoBlob(imgData));
    });
    return image.pipe(take(1));
  }
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }
}
