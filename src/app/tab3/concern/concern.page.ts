import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Storage } from '@ionic/storage';
import {toggle, expand, collapse} from 'transition-height';
import { SpeakService } from '../../../common/service/speak.service';

@Component({
  selector: 'app-concern',
  templateUrl: './concern.page.html',
  styleUrls: ['./concern.page.scss'],
})
export class ConcernPage implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
  }

  
}
