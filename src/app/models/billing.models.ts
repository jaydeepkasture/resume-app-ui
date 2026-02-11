export interface PlanBenefit {
  [key: string]: number;
}

export interface Plan {
  planCode: string;
  planName: string;
  price: number;
  currency: string;
  billingCycle: string;
  benefits: PlanBenefit;
}

export interface UserSubscription {
  plan: string;
  status: string;
  endDate: string;
  benefits: PlanBenefit;
}
