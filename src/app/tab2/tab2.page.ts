import { Component } from '@angular/core';
import { ToastService } from 'ng-zorro-antd-mobile';
import { HttpService } from '../../common/service/http-config.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { SpeakService } from '../../common/service/speak.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  data = {
    
  }
  constructor(
    private _toast: ToastService,
    public http: HttpService,
    public nav: NavController,
    private Speak: SpeakService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    
  }

  // detail
  goDetail(data){
    this.nav.navigateForward('/service-project', {
      queryParams: { info: data }
    });
  }


}
