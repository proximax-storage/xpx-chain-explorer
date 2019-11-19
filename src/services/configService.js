class Config {
  constructor(configObject) {
    this.coin = configObject.Coin
    this.nodes = configObject.Nodes
    this.networkType = configObject.NetworkType
    this.rentalFeeInfo = configObject.RentalFeeInfo
    this.mapsInfo = configObject.MapsInfo
  }
}

export { Config }