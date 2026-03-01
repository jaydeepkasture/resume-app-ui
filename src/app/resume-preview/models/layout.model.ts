export interface LayoutConfig {
  layoutId: string;
  name: string;
  styles: LayoutStyles;
  header: LayoutHeader;
  sections: LayoutSection[];
}

export interface LayoutStyles {
  fontFamily: string;
  primaryColor: string;
  textPrimary: string;
  headerBottom: string;
  sectionGap: string;
  [key: string]: string; // For any other CSS variables
}

export interface LayoutHeader {
  alignment: 'left' | 'center' | 'right';
  name: {
    visible: boolean;
    size: string;
    weight: string;
  };
  contact: {
    visible: boolean;
    size: string;
    separator: string;
    visibleFields: string[]; // e.g. ['location', 'phoneNo', 'email', 'linkedIn', 'gitHub']
  };
  divider: {
    enabled: boolean;
    color: string;
    height: string;
    width: string;
    marginTop: string;
    marginBottom: string;
  };
}

export interface LayoutSection {
  type: string; // 'summary', 'experience', 'education', 'skills'
  enabled: boolean;
  title: string;
}

export interface LayoutListResponse {
  status: boolean;
  message: string;
  data: LayoutConfig[];
  totalCount?: number;
}
