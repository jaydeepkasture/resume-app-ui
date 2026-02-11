import { Injectable } from '@angular/core';
import { PlanBenefit } from '../../models/billing.models';

@Injectable({ providedIn: 'root' })
export class BenefitsService {
  private benefits: PlanBenefit = {};

  set(benefits: PlanBenefit) {
    this.benefits = benefits;
  }

  get(code: string): number {
    return Number(this.benefits[code] ?? 0);
  }

  has(code: string): boolean {
    return Number(this.benefits[code]) > 0;
  }
}
