import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ThemeChangeService } from '../../common/service/theme-change.service';
import { SpeakService } from '../../common/service/speak.service';
import { HttpService } from '../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { weatherInfo } from '../../common/staticInfo/globeInfo';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public userInfo: any;
  public darkTheme: boolean;
  public ttsSpeak: boolean;
  // 天气
  monwes = []; // 周一~周三
  tursun = []; // 周四~周日
  weathers = weatherInfo;
  item = [
    {
      title: '照护关注',
      exp: '可指定要关注的人'
    },
    {
      title: '语音助手',
      exp: '功能操作时语音提示'
    },
    {
      title: '夜间模式',
      exp: '夜间使用缓解眼疲劳'
    }
  ];
  previous = 0;
  constructor(
    public alertController: AlertController,
    public nav: NavController,
    private storage: Storage,
    private Theme: ThemeChangeService,
    private Speak: SpeakService,
    public http: HttpService,
    private toast: ToastService,
    private tts: TextToSpeech
  ) {}

  ngOnInit(): void {
    this.storage.get('userINFO').then(data => {
      this.userInfo = data;
    });
    this.getConfig();
  }

  // 获取主题、语音配置
  getConfig(): void {
    this.storage.get('darkTheme').then(res=>{
      this.darkTheme = res;
      // console.error('darkTheme',this.darkTheme)
      if(!this.darkTheme) this.Theme.ThemeChange('dark');
    });
    this.storage.get('ttsSpeak').then(res=>{
      this.ttsSpeak = res;
      // console.error('ttsSpeak',this.ttsSpeak)
      this.Speak.onOff = res;
    })
  }

  ionViewWillEnter(): void {
    if(this.userInfo){
      // this.throttle(this.getWeather, 10800000).call(this, this.userInfo.id);
    }
  }


  // 更改tts
  ttsChange() {
    if (this.ttsSpeak) {
      this.storage.set('ttsSpeak', true).then(() => {
        this.Speak.onOff = true;
      });
    } else {
      this.storage.set('ttsSpeak', false).then(() => {
        this.Speak.onOff = false;
      });
    }
  }
  // 更改主题
  themeChange() {
    console.log(this.darkTheme)
    if (this.darkTheme) {
      this.storage.set('darkTheme', true).then(() => {
        this.Theme.ThemeChange('light');
      });
    } else {
      this.storage.set('darkTheme', false).then(() => {
        this.Theme.ThemeChange('dark');
      });
    }
  }


  // 退出
  async exit() {
    this.Speak.speak('退出当前登录账号');
    const alert = await this.alertController.create({
      message: '退出当前用户?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            this.storage.remove('loginStatus').then(()=>{
              this.storage.set('loginStatus', false).then(()=>{
                this.nav.navigateRoot('/login');
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }

  speakWeather(data){
    if(data){
      this.Speak.speak(`${data.date},${data.weekDay},${data.temperature},${data.wea}`);
    }
  }
  speak(data){
    if(data){
      this.Speak.speak(`${data.title},${data.exp}`);
    }
  }
  ev(e){
    event.stopPropagation();
  }

  ionViewWillLeave() {
    this.Speak.stop();
  }

  throttle(func:Function, wait){
    var content, args;
    content = this;
    return function(){
      var now = +new Date();
      args = arguments;
      if (now - content.previous > wait) {
        func.apply(content, args);
        content.previous = now;
      }
    }
  }

}
