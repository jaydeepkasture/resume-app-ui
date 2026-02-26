export interface PaperConfig {
  maxWidth?: string;
  margin?: string;
}

export interface ColorsConfig {
  primary: string;
  textPrimary: string;
}

export interface TypographyNameConfig {
  size: string;
  weight: string;
}

export interface TypographyContactConfig {
  size: string;
}

export interface TypographySectionTitleConfig {
  size: string;
  weight: string;
}

export interface TypographyBodyConfig {
  size: string;
  lineHeight: string;
}

export interface TypographyJobTitleConfig {
  transform: string;
  weight: string;
}

export interface TypographyConfig {
  fontFamily: string;
  name: TypographyNameConfig;
  contact: TypographyContactConfig;
  sectionTitle: TypographySectionTitleConfig;
  body: TypographyBodyConfig;
  jobTitle?: TypographyJobTitleConfig;
}

export interface SpacingConfig {
  headerBottom: string;
  sectionGap: string;
  paragraphGap?: string;
  listGap?: string;
}

export interface ThemeConfig {
  paper?: PaperConfig;
  colors: ColorsConfig;
  typography: TypographyConfig;
  spacing: SpacingConfig;
}

export interface HeaderDividerConfig {
  enabled: boolean;
  height: string;
  color: string;
  marginTop: string;
  marginBottom: string;
}

export interface SidebarConfig {
  enabled: boolean;
  width: string;
  background: string;
  valign: 'left' | 'right';
}

export interface DecorationsConfig {
  headerDivider: HeaderDividerConfig;
  sidebar?: SidebarConfig;
}

export interface ResumeTemplate {
  id?: number;
  name?: string;
  layout?: 'single-column' | 'two-column' | 'sidebar';
  layoutType?: 'single-column' | 'two-column' | 'sidebar'; // Added for backend compatibility
  sectionOrder: string[];
  theme: ThemeConfig;
  decorations: DecorationsConfig;
}
