export type User1 = {
  User_id: number;
  User_registrationDate: Date;
  User_active: boolean;
};
export type UserData = {
  User_dni: number;
  User_role: string;
  User_name: string;
  User_surname: string;
  User_email: string;
  User_password: string;
  User_phoneNumber: string;
  User_address: string;
};
export type UserType = User1 & UserData;

export type authUserType = {
  User_id: number;
  User_name: string;
  User_surname: string;
};

export type SupplierType = {
  Supplier_id: number;
  Supplier_nit: number;
  Supplier_name: string;
  Supplier_contactInfo: string;
  Supplier_email: string;
  Supplier_phoneNumber: string;
  Supplier_city: string;
  Supplier_address: string;
  Supplier_active: boolean;
  Supplier_registrationDate: Date;
  Supplier_userId: number;
};

export type CustomerType = {
  Customer_id: number;
  Customer_dni: number;
  Customer_name: string;
  Customer_surname: string;
  Customer_email: string;
  Customer_phoneNumber: string;
  Customer_address: string;
  Customer_habeasData: boolean;
  Customer_registrationDate: Date;
  Customer_userId: number;
};
export type PurchasesType = {
  Purchase_id: number;
  Purchase_description: string;
  Purchase_date: Date;
  Purchase_totalAmount: number;
  Purchase_userId: number;
  Purchase_supplierId: number;
  Purchase_paymentMethod: string;
  Purchase_dueDate: Date;
  Purchase_close: boolean;
  Supplier: {
    Supplier_name: string;
  };
};

type Product = {
  Product_ref: string;
  Product_name: string;
  Product_description: string;
  Product_qty: number;
  Product_cost: number;
  Product_price: number;
};

export type PurchaseType = PurchasesType & {
  Supplier: {
    Supplier_nit: number;
    Supplier_contactInfo: string;
    Supplier_email: string;
    Supplier_phoneNumber: string;
  };
  User: {
    User_name: string;
    User_surname: string;
  };
  Product: Product[];
};
