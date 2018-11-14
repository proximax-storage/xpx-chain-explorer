export interface CommonInterface {
  password: string;
  privateKey: string;
}

export interface WalletInterface {
  encrypted;
  iv;
}

export interface WalletAccountInterface {
  name: string;
  accounts: object;
}

export interface AccountsInterface {
  brain: boolean;
  algo: string;
  encrypted: string;
  iv: string;
  address: string;
  label: string;
  network: number;
}
