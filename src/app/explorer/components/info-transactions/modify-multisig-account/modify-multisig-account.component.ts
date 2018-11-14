import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modify-multisig-account',
  templateUrl: './modify-multisig-account.component.html',
  styleUrls: ['./modify-multisig-account.component.scss']
})
export class ModifyMultisigAccountComponent implements OnInit {

  @Input() dataSelected = {};
  @Input() nameTransaction = '';
  constructor() { }

  ngOnInit() {
  }

}
