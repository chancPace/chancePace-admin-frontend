export interface SignupData {
  email: string;
  password: string;
  role?: string;
  agreed: boolean;
  adminSecretKey?: string;
  phoneNumber?: string;
}

export interface User {
  id?: string;
  userName?: string;
  password?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  accountStatus?: string;
  role?: string;
  bankAccountName?: string;
  bankAccountOwner?: string;
  bankAccountNumber?: string;
  isMarketingAgreed?: boolean;
  membership?: boolean;
  agreed?: boolean;
  lastLogin?: string;
  createdAt?: string;
  adminSecretKey?: string;
  key?: string; // Optional because it will be added later
}

export interface LoginData {
  email: string;
  password: string;
}

export interface oneUserData {
  userId: number;
}

export interface AddUserData {
  userName: string;
  email: string;
  password: string;
  gender?: string;
  phoneNumber?: string;
  bankAccountName?: string;
  bankAccountOwner?: string;
  bankAccountNumber?: string;
  role: string;
  agreed?: boolean;
  adminSecretKey?: string;
}

export interface HostMainImg {
  src: string;
}

export interface Explanation {
  img: { src: string };
  title: string;
  text: string;
}

export interface Procedure {
  index: string;
  img: { src: string };
  title: string;
  text: string;
}

export interface Space {
  id?: number;
  spaceName?: string;
  spaceLocation?: string;
  description?: string;
  spacePrice?: number;
  discount?: number;
  amenities?: string[]; // 편의시설 목록 (문자열 배열)
  cleanTime?: number;
  spaceStatus?: string; // 공간의 상태 ('AVAILABLE' 또는 'UNAVAILABLE')
  isOpen?: boolean; // 공간이 열려 있는지 여부
  isDelete?: boolean;
  guidelines?: string[]; // 주의사항 (문자열 배열)
  categoryId?: number;
  Minimum?: number; // 최소 인원
  Maximum?: number; // 최대 인원
  spaceImg?: { src?: string }[]; // 공간 이미지 배열
  businessStartTime?: number;
  businessEndTime?: number;
  createdAt?: string;
  spaceAdminName?: string;
  spaceAdminPhoneNumber?: string;
  addPrice?: number;
  minGuests?: number;
  maxGuests?: number;
  spaceRating?: number;
}

export type CategoryType = string;

export interface Category {
  id?: number;
  categoryName?: string;
  pId?: number | null;
}

export interface CouponData {
  couponName?: string;
  couponCode?: string;
  discountPrice?: number;
  userId?: number;
  expirationDate?: any;
  createdAt?: string;
  id?: number;
  isActive?: boolean;
  couponId?: number;
}

export interface OptionType {
  label: string;
  value: number;
}

export interface HostInquiry {
  inquiryId: number;
  memberType: string;
  inquiryTitle: string;
  inquiryEmail: string;
  inquiryContents: string;
  inquiryStatus: string;
}

export interface AllowSpace {
  spaceId: number;
  spaceStatus: string;
}

export interface optionProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  data?: User;
  type: string;
  fetchUserData?: any;
  fetchUsers?: any;
}

export interface isSpace {
  spaceId: string;
  isOpen?: boolean;
  isDelete?: boolean;
}
