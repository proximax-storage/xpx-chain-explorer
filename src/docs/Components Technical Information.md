# Components Technical Information

This section briefly describes the functionality of each component and files.

The main component is the App.js component, in this rest the other components, however there is functionality in the files external to the components that is also important for the application, these files are javascript scripts and json format files, these files They are located in the services folder, and in config, below a description:

## Services

### Config.json
*from the root, root > public > config > config.json.*

This file handles the necessary information, so that the explorer works, like the nodes, type of network, identification on the currency, in this case XPX.
Some aspects of the application are also controlled, such as what modules to display, information about the maps, and the version

### ConfigService.js
*from the root, root > src > services > configService.js.*

This file contains and exports a class that controls the information contained in the config.json file, later, it will show how it integrates with the application.

### Persistence.js
*from the root, root > src > services > persintence.js.*

This file contains and exports a class that controls the entry and exit of data in the local and session storage.
The class called Persistence, receives the javascript core classes localStorage and sessionStorage as a parameter.
Then I will show how it integrates with the application.

### ProximaxProvider.js
*from the root, root > src > services > proximaxProviders.js.*

This file contains and exports a class, which handles and controls some functionalities related to the proximax catapult sdk, this class receives as a parameter in its constructor the node (url) with which it will communicate.

### Utils.js
*from the root, root > src > services > Utils.js.*

This file contains and exports a class, which contains methods that facilitate the overall handling of the data, so these methods are used throughout the application, then we will show you how it is integrated into the application.

## Service-Worker.js
*from the root, root > service-worker.js.*

This file was created in order to manage the application cache, so that when a new release is made, the cache is updated automatically, however it is necessary to change the version in the LATEST_VERSION variable and match it with the version it handles in the "config.json" file.

## Main.js
*from the root, root > src > main.js.*

This file controls and runs the main instance of Vue.

In this file a request is made through axios to the file "config.json" to obtain the information it contains and apply it to the application, all this before the vue instance is created and executed.

As seen in the file, the classes containing the files in the "services" folder are extended as prototypes, in order to be able to use these classes throughout the application with the key designated in the instance, such as:

```
Vue.prototype.$storage = new Persistence (localStorage)
```

the "$storage" property can be used throughout the application,
The $storage property can be used throughout the application, however it is an instance of a class that has methods, which can also be used as shown below.

```
this.$storage.set('myItem', item)
```

*Read the service files to find out their parameters and methods.*

Immediately after assigning the classes that do not need the configuration file, the asynchronous function configIntegration will be executed, which internally makes a request to "config.json" to obtain its parameters and information.

Once the data is received, the **$config** property is configured and the **$proximaxProvider** is configured with the current node.

After this process the vue instance starts.

## Vue Instance

The project also uses MDBootstrap Vue, to improve some of the components.

### App.vue
*from the root, root > src > App.vue.*

In the App.vue file resides the application as such, in this file the first values are configured in the vuex and a web socket is used to know the last blocks that are coming from the blockchain.

In the template of this file there is an element called router-view, this is the component responsible for displaying the views according to the current route, the routes are configured in the file "router.js"List

**Imported Components:**

  * AppHeader
  * AppFooter
  * TopButton

**Project Structure**

After the first instance (App.vue) is already created, the views and their components are shown.
In the project structure there are two folders, one called "components" and another called "views",
The views are the main ones and the components will be inside them fulfilling their function.

## Views

### Home.vue
*from the root, root > src > views > Home.vue.*

It is the main view, the first one shown when entering the page.

**Imported Components:**

  * NodeAdmin
  * SearchBar
  * Blocks
  * Error


### NetworksStats.vue
*from the root, root > src > views > NetworksStats.vue.*

This view shows graphics related to the proximax blockchain.

**Imported Components:**

  * Graphics
  * mdbProgress

### Map.vue
*from the root, root > src > views > Map.vue.*

This component shows maps in relation to the location of the nodes.

**Imported Components:**

  * mdbIcon
  * mdbInput
  * mdbDropdown
  * mdbDropdownItem
  * mdbDropdownMenu
  * mdbDropdownToggle

### SearchResult.vue
*from the root, root > src > views > SearchResult.vue.*

This is the largest and most complex component, since it has the greatest functionality of the entire explorer.
In this view the value to be searched is analyzed, which is added in the route as a parameter and depending on the characteristics the search is performed and the necessary components are activated or deactivated to display the information correctly.

**Imported Components:**

  * NodeAdmin
  * SearchBar
  * Error
  * PublicKey
  * Multisig
  * AccountNamespace
  * BlockInfo
  * Transaction
  * NamespaceInfo
  * MosaicInfo
  * RecentTrans
  * Mosaics
  * Modal
  * mdbProgress
  * IncomingTrans

### List.vue
*from the root, root > src > views > List.vue.*

This view shows a list of tiles and namespaces, corresponding to the "Rental Fee Sink Account", the view changes depending on what is in the parameter of the route.

**Imported Components:**

  * NodeAdmin
  * SearchBar
  * NamespacesList
  * MosaicsList

## Components

### AppHeader.vue
*from the root, root > src > components > global > AppHeader.vue.*

This component shows the header of the system where it is invoked. In which it is located: the logo, the navigation bar and a clock with the current local time.

### AppFooter.vue
*from the root, root > src > components > global > AppFooter.vue.*

This component shows the footer of the system where it is invoked. In it is shown Copyrigth, name of the application and the version.

### Error.vue
*from the root, root > src > components > global > Error.vue.*

This component receives a title and a message that shows an error where it is invoked, to communicate with this component the internal Vuex system is used.

### Modal.vue
*from the root, root > src > components > global > Modal.vue.*

This component was created with a general purpose, however it was finally used for inner transactions of a aggregate bonded transaction or complete aggregate.
This component receives its parameters through Vuex.

### Paginator.vue
*from the root, root > src > components > global > Paginator.vue.*

This component was initially used, however it was removed, but it is intended to be used to view all transactions of a public account or key.

### SearchBar.vue
*from the root, root > src > components > global > SearchBar.vue.*

Delicate component that fulfills the function of receiving a parameter to perform a search, said parameter must comply with the characteristics depending on the type of search, for example: Address, PublicKey, Block, Hash, MosaicID, NamespaceID, Mosaic Name and Namespace Name.

### TopButton.vue
*from the root, root > src > components > global > TopButton.vue.*

This component is a simple button that performs the function of returning to the top of the current page when pressed.

### Blocks.vue
*from the root, root > src > components > home > Blocks.vue.*

This component shows a list of the last blocks that the blockchain is confirming.

### NodeAdmin.vue
*from the root, root > src > components > home > NodeAdmin.vue.*

This component has three parts

In the first one it offers the functionality of changing the current node, showing a list of available nodes, additionally also the functionality of adding a custom node to the list, as long as this node (url) complies with The necessary features.

The second is a box that shows the height of the current block.

And the third and last, is a box that shows the calculation of the average response time of the nodes corresponding to the last block.

### MosaicsList.vue
*from the root, root > src > components > List > MosaicsList.vue.*

Like the block component, this component shows a list of tiles corresponding to the "Rental Fee Sink Account".

### NamespacesList.vue
*from the root, root > src > components > List > NamespacesList.vue.*

Like the block component, this component shows a list of tiles corresponding to the "Rental Fee Sink Account".

### Graphic.vue
*from the root, root > src > components > networkStats > NamespacesList.vue.*

This component shows a graph which receives parameters from its parent view. This component depends on the Chart.js library.

### AccountNamespace.vue
*from the root, root > src > components > searchResult > AccountNamespace.vue.*

This component shows a list of namespaces and some additional details, corresponding to an account, which is what you find in the current view.

### BlockInfo.vue
*from the root, root > src > components > searchResult > BlockInfo.vue.*

This component is only a section and shows the most detailed information of a block.

### IncomingTrans.vue
*from the root, root > src > components > searchResult > IncomingTrans.vue.*

This component is shown if a public key is invalid for the blockchain but has incoming transactions.

### MosaicInfo.vue
*from the root, root > src > components > searchResult > MosaicInfo.vue.*

This component is only a section and shows detailed information of a mosaic.

### Mosaics.vue
*from the root, root > src > components > searchResult > Mosaics.vue.*

This component shows a list of mosaicos and some additional details, corresponding to an account, which is what you find in the current view.

### MultisigInfo.vue
*from the root, root > src > components > searchResult > MultisigInfo.vue.*

This component is a section and shows the multi-signature information of an account, if available.

### NamespaceInfo.vue
*from the root, root > src > components > searchResult > NamespaceInfo.vue.*

This component is a section and shows the detailed information of a namespace.

### PublicKey.vue
*from the root, root > src > components > searchResult > PublicKey.vue.*

This component is a section and shows the detailed information of an account by means of the public key or address.

### RecentTrans.vue
*from the root, root > src > components > searchResult > RecentTrans.vue.*

This component lists the transactions of an account.

### Transaction.vue
*from the root, root > src > components > searchResult > Transaction.vue.*

This component shows the detailed information of a transaction, even if it is "Aggregate Bonded" or "Aggregate Complete"

**Imported Components:**

  * mdbIcon
  * InnerTransactions
  * Cosignatures
  * Modifications
  * MosaicsInTransfer

### Transaction.Cosignatures.vue
*from the root, root > src > components > searchResult > Transaction.Cosignatures.vue.*

This component lists the cosignatories of an account, if it has them.

### Transaction.InnerTransactions.vue
*from the root, root > src > components > searchResult > Transaction.InnerTransactions.vue.*

In the event that the transaction is "Aggregate", this component lists the internal transactions, this component also communicates with vuex and in turn with the "Modal.vue" component to display the internal transaction information.

### Transaction.Modifications.vue
*from the root, root > src > components > searchResult > Transaction.Modifications.vue.*

In the event that the transaction is "Modify Mosaic Metadata", this component shows these modifications.

### Transactions.Mosaics.vue
*from the root, root > src > components > searchResult > Transaction.Modifications.vue.*

This component lists the tiles sent in the current transaction except for XPX shown as amount.