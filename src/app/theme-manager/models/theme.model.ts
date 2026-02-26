import { ThemeConfig } from '../../resume-preview/models/template.model';

export interface Theme {
  id: string;
  name: string;
  theme: ThemeConfig;
  decorations?: any;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ThemeListResponse {
  status: boolean;
  message: string;
  data: {
    items: Theme[];
    totalCount: number;
    page: number;
    pageSize: number;
  };
}

export interface ThemeDetailResponse {
  status: boolean;
  message: string;
  data: Theme;
}
