import { Component, OnInit } from '@angular/core';
import { NodeService } from '../dashboard/services/node.service';
import { SharedService } from '../../app/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header: any;
  nodeSelected: string;
  objectkeys = Object.keys;
  optionsSelect: Array<any>;
  constructor(
    private nodeService: NodeService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.optionsSelect = this.nodeService.getAllNodes();
    this.nodeService.getNodeObservable().subscribe( next => this.nodeSelected = next );
    this.buildMenu();
  }

  buildMenu() {
    const selectNode = this.buildItemMenu(1, 'Select Node', '', '', false, 'select-node', true);
    const explorer = this.buildItemMenu(1, 'Explorer', '', '', false, 'explorer-transaction', true);
    this.header = {
      explorer: explorer
    };
  }

  buildItemMenu(
    typeMenu: number,
    name: string,
    classParam: string,
    icon: string,
    rol: boolean,
    route: string,
    show: boolean,
    subMenu = {}
  ) {
    const type = (typeMenu === 1) ? 'default' : 'dropdown';
    return {
      'type': type,
      'name': name,
      'class': classParam,
      'icon': icon,
      'rol': rol,
      'link': route,
      'show': show,
      'submenu': subMenu
    };
  }

  optionSelected(nodeSelect) {
    this.nodeService.addNewNodeSelected(nodeSelect);
    this.sharedService.showInfo('Node selected', nodeSelect);
  }
}
