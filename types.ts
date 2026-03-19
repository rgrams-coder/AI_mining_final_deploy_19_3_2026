export type ViewState = 
  | 'dashboard' 
  | 'library' 
  | 'notes' 
  | 'royalty' 
  | 'ratings' 
  | 'consultancy' 
  | 'profile' 
  | 'returns'
  | 'star'
  | 'admin'
  | 'minerals'
  | 'production'
  | 'compliance';

export interface ProductionDetail {
  id?: string;
  date: string;
  mineralName: string;
  quantity: number;
  source: string;
  remarks?: string;
  productionSummaryId?: string;
}

export interface DailyProductionSummary {
  id?: string;
  date: string;
  mineralName: string;
  openingBalance: number;
  production: number;
  totalStocked: number;
  dispatchRail: number;
  dispatchTruck: number;
  dispatchLocalSale: number;
  dispatchOther: number;
  totalChallanIssued: number;
  totalQuantityDispatched: number;
  closingBalance: number;
}

export interface ChallanEntry {
  id?: string;
  date: string;
  mode: 'rail' | 'vehicle' | 'local_sale' | 'other';
  rrNo?: string;
  challanNo: string;
  quantityDispatched: number;
  dispatchedTime: string;
  destinationName: string;
  destinationAddress: string;
  destinationReachedTime?: string;
  routeOfTravelling: string;
  productionSummaryId?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
  progress: number;
}

export interface Ebook {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  fileUrl: string;
  coverUrl?: string;
  requiresSubscription: boolean;
  requiredPlan: string;
  hasAccess?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export interface ReturnData {
  month: string;
  revenue: number;
  expenses: number;
  royalty: number;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
}