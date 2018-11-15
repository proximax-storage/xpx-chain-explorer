import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../shared/services/shared.service';
import { NemProvider } from '../../shared/services/nem.provider';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  nodeObsSelected: BehaviorSubject<any>;
  // nodeObsSelected$: Observable<any> = this.nodeObsSelected.asObservable();
  nameItemsArrayStorage = 'proximax-explorer-nodes';
  nameItemSelectedStorage = 'node-selected';
  listNodes = [
    '190.216.224.11:3000',
    environment.nodeDefault,
    '192.168.10.38:3000',
    'testnet1.proximax.io:3000'
  ];

  constructor(
    private sharedService: SharedService,
    private nemProvider: NemProvider
  ) { }

  /**
   *
   *
   * @param {any} url
   * @memberof NodeService
   */
  addNewNodeSelected(url) {
    console.log('addNewNodeSelected');
    this.nodeObsSelected.next(url);
  }

  /**
     * Init node and validations
     *
     * @returns
     * @memberof NodeService
     */
  initNode() {
    // validates if a selected node exists in the storage
    const constSelectedStorage = this.getNodeSelected();
    const nodeSelected = (constSelectedStorage === null) ? environment.nodeDefault : constSelectedStorage;
    // creates a new observable
    this.nodeObsSelected = new BehaviorSubject<any>(nodeSelected);
    // Start the subscription function to the selected node.
    this.subscribeNodeSelected();

    // go through all the nodes that exist by default, and verify that they do not repeat in the storage
    this.listNodes.forEach(element => {
      this.validateToAddNode(element);
    });
  }


  /**
   * Add new selected node
   *
   * @memberof NodeService
   */
  subscribeNodeSelected() {
    this.nodeObsSelected.subscribe(
      next => {
        console.log('Subscribe nodo seleccionado: ', next);
        this.setSelectedNodeStorage(next);
        this.nemProvider.initInstances(next);
      }
    );
  }


  /**
   * add list of nodes in the storage
   *
   * @param {any} node
   * @param {boolean} [showMsg=false]
   * @param {string} [msgNodeCreated='']
   * @returns
   * @memberof NodeService
   */
  validateToAddNode(node, showMsg = false, msgNodeCreated = '') {
    // check if there are nodes created in the storagr
    const dataStorage = this.getAllNodes();
    const data = { value: node, label: node };

    // if there is no data in the storage, proceed to create a new node array in the storage
    if (dataStorage === null) {
      // Add an array of nodes in the storage
      this.setArrayNode([data]);
      if (showMsg) {
        this.sharedService.showSuccess('Congratulations!', msgNodeCreated);
      }
      return;
    }

    // if there is data in the storage, verify that this data does not repeat in the storage
    const existData = dataStorage.find(element => element.value === node);
    if (existData === undefined) {
      dataStorage.push(data);
      this.setArrayNode(dataStorage);
      if (showMsg) {
        this.sharedService.showSuccess('Congratulations!', msgNodeCreated);
      }
      return;
    }

    if (showMsg) {
      this.sharedService.showError('Node repeated', `The '${node}' node already exists`);
    }

  }

  /**
  * Add an array of nodes in the storage
  *
  * @param {any} nodes
  * @memberof NodeService
  */
  setArrayNode(nodes) {
    localStorage.setItem(this.nameItemsArrayStorage, JSON.stringify(nodes));
  }



  /**
   * Add new selected node in the storage
   *
   * @param {any} nodes
   * @memberof NodeService
   */
  setSelectedNodeStorage(node) {
    console.log('agrega nodo seleccionado en el localstorage');
    localStorage.setItem(this.nameItemSelectedStorage, JSON.stringify(node));
  }


  /**
   * Get all nodes
   *
   * @returns
   * @memberof NodeService
   */
  getAllNodes() {
    return JSON.parse(localStorage.getItem(this.nameItemsArrayStorage));
  }


  /**
   * Get a node selected
   *
   * @returns
   * @memberof NodeService
   */
  getNodeSelected() {
    return JSON.parse(localStorage.getItem(this.nameItemSelectedStorage));
  }

  /**
   * Return node observable
   *
   * @returns
   * @memberof NodeService
   */
  getNodeObservable() {
    return this.nodeObsSelected.asObservable();
  }
}
