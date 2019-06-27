import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFC } from '@ionic-native/nfc/ngx';
import { HttpService } from '../../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Storage } from '@ionic/storage';
import { NfcService } from '../../../common/service/nfc.service';
import { SpeakService } from '../../../common/service/speak.service';

@Component({
  selector: 'app-service-project',
  templateUrl: './service-project.page.html',
  styleUrls: ['./service-project.page.scss'],
})
export class ServiceProjectPage implements OnInit {
  public data: any;
  public userId;
  // slide 选项
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  // 登记diy选项
  diy = [];
  goods = false; // 是否使用物品
  num = 0; // 使用多少件
  
  constructor(
    private toast: ToastService,
    public route: ActivatedRoute,
    public http: HttpService,
    private cfn: NfcService,
    private nfc: NFC,
    private Speak: SpeakService,
    private storage: Storage
  ) { }

  ngOnInit() {
    // 获取路由参数
    const queryParams = this.route.snapshot.queryParams;
    console.error(queryParams);
    this.data = queryParams.info;
  }

  // slide change callback
  segmentChanged(segment,slider){
    console.log(segment.value)
    slider.slideTo(Number(segment.value));
  }
  slideChange(slider,segment){
    slider.getActiveIndex().then(index=>{
      segment.value = `${index}`;
    });
  }


}
