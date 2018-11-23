import { Component, OnInit, Input } from '@angular/core';
import { NemProvider } from '../../../../shared/services/nem.provider';

@Component({
  selector: 'app-register-namespace',
  templateUrl: './register-namespace.component.html',
  styleUrls: ['./register-namespace.component.scss']
})
export class RegisterNamespaceComponent implements OnInit {

  @Input() dataSelected;
  @Input() nameTransaction = '';
  constructor(
    private nemProvider: NemProvider
  ) { }

  ngOnInit() {
  }

}
