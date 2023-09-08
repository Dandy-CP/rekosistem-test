export interface ITransaction {
  id: number;
  productid: number;
  total: number;
  userid: string;
}

export interface IProduct {
  id: number;
  name: string;
  typeid: number;
}

export interface IPrices {
  id: number;
  points: number;
  productid: number;
}

export interface ITypes {
  color: string;
  id: number;
  name: string;
}

export interface IFilteredTransaction {
  id: number;
  productName: string;
  productid: number;
  total: number;
  typeColor: string;
  typeName: string;
  userid: string;
  point: number;
}
