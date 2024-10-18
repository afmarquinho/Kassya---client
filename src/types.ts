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
