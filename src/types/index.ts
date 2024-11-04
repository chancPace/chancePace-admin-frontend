export interface SignupData {
  email: string;
  password: string;
  role?: string;
  agreed: boolean;
  adminSecretKey?: string;
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
  guidelines?: string[]; // 주의사항 (문자열 배열)
  categoryId?: number;
  Minimum?: number; // 최소 인원
  Maximum?: number; // 최대 인원
  spaceImg?: { src?: string }[]; // 공간 이미지 배열
  businessStartTime?: number;
  businessEndTime?: number;
}

export type CategoryType = string;

export interface Category {
  id?: number;
  categoryName?: string;
  pId?: number | null;
}

export interface CouponData {
  couponname?: string;
  couponCode?: string;
  discountPrice?: number;
  userId?: any;
  expire?: any;
  createdAt?: string;
  couponId?: number;
}
