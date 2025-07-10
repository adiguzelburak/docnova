export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  superAdmin: boolean;
  companies: Company[];
  jwt: string;
  expirationDate: string;
  user: User;
  mfaEnabled: boolean;
  secretImageUri?: any;
  lastCompanyId: string;
}
interface User {
  id?: any;
  email: string;
  firstName?: any;
  lastName?: any;
  phoneNumber?: any;
  creationTime?: any;
  photoUrl?: any;
  mailLang: string;
  isSuperAdmin?: any;
  lastLoginTime?: any;
  authorities?: any;
  adminAuthorities: any[];
  featureAllowed: boolean;
}
interface Company {
  id: string;
  name: string;
  taxNumber: string;
  website?: any;
  address: string;
  city: string;
  country: string;
  portalType: string;
  postalCode: string;
  phoneNumber: string;
  credit: number;
  iconUrl?: any;
  email: string;
  userCount: number;
  vatNumber: string;
  faxNumber?: any;
  mailLanguage: string;
  subscriptionType: string;
  cif?: any;
  sftp: boolean;
  isSubCompany: boolean;
  peppolParticipantId?: any;
  peppolRegisterRequestStatus: string;
  featureAllowed: boolean;
  subCompanies: any[];
  stripeObj: StripeObj;
  authorities: string;
  compAuthTypes: string;
}
interface StripeObj {
  stripeCustomerId: string;
  type: string;
  renewalDate: string;
  melaAiTokenCount: number;
  renewal: boolean;
}
