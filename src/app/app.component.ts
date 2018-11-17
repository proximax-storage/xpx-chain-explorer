import { Component } from '@angular/core';
import { NemProvider } from './shared/services/nem.provider';
import { NodeService } from './dashboard/services/node.service';

@Component({
  selector: 'app-root',
  templateUrl: `app.component.html`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor(
    private nemProvider: NemProvider,
    private nodeService: NodeService
  ) { }

  ngOnInit() {
    // this.initParticle();
    const nodeSelected = this.nodeService.initNode();
  }

  initParticle() {
    this.myStyle = {
      'position': 'absolute',
      'top': '0',
      'width': '100%',
      'height': '100%'
    };

    this.myParams = {
      particles: {
        number: { value: 45 },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        size: { value: 4 }
      }
    };
  }
}
