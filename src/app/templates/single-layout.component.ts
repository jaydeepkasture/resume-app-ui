import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { FieldType } from '../layout-engine/layout-types';
import { LayoutEngineService } from '../layout-engine/layout-engine.service';
import { DecorationRendererComponent } from '../layout-engine/decoration-renderer.component';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-single-layout',
  standalone: true,
  imports: [CommonModule, DecorationRendererComponent],
  templateUrl: './single-layout.component.html',
  styleUrls: ['./single-layout.component.css']
})
export class SingleLayoutComponent implements OnInit {
  public FieldType = FieldType;

  constructor(
    private sanitizer: DomSanitizer,
    public layoutEngine: LayoutEngineService,
    private http: HttpService
  ) {}

  resume: any;
 templateConfig: any = {
  renderMode: "edit",
  layoutType: "single",

  labels: {
    saveBtn: "Save",
    loadingData: "Loading backend resume data...",
    deleteTitle: "Delete item",
    deleteIcon: "X",
    pipeSeparator: "| ",
    dashSeparator: "-",
    inPrefix: "in ",
    aboutMe: "ABOUT ME",
    education: "EDUCATION",
    workExperience: "WORK EXPERIENCE",
    skills: "SKILLS"
  },

  theme: {
    colors: {
      primary: "#111111",
      textPrimary: "#222222",
      textSecondary: "#666666",
      background: "#ffffff",
      pageBackground: "#f2f2f2",
      borderColorPrimary: "#dddddd",
      hoverBackground: "#fafafa",
      editorFocus: "rgba(0,0,0,0.05)",
      editorEmpty: "rgba(0,0,0,0.03)",
      white: "#ffffff",
      transparent: "transparent"
    },

    layout: {
      fullWidth: "100%",
      pageWidth: "210mm",
      pageMinHeight: "297mm",
      pageShadow: "0 8px 30px rgba(0,0,0,0.08)",
      layoutFullHeight: "100vh",
      saveBarMaxWidth: "210mm"
    },

    typography: {
      fontFamily: "'Poppins', sans-serif",
      nameSize: "42px",
      roleSize: "20px",
      sectionTitleSize: "16px",
      bodySize: "14px",
      smallSize: "13px",
      fontWeightBold: "700",
      fontWeightMedium: "500",
      fontWeightNormal: "400",
      textTransformUppercase: "uppercase",
      lineHeightBody: "1.7"
    },

    spacing: {
      pagePadding: "70px",
      sectionGap: "45px",
      itemGap: "18px",
      headerGap: "10px",
      smallGap: "12px",
      tinyGap: "6px",
      dividerGap: "25px",
      errorPadding: "15px",
      errorMarginBottom: "20px"
    },

    ui: {
      displayStyleFlex: "flex",
      displayStyleBlock: "block",
      displayStyleInlineBlock: "inline-block",
      flexDirectionColumn: "column",
      flexDirectionRow: "row",
      flexWrapStyle: "wrap",
      alignCenterStyle: "center",
      flexEndStyle: "flex-end",
      spaceBetweenStyle: "space-between",
      positionRelative: "relative",
      positionAbsolute: "absolute",
      zIndexFront: "10",
      zIndexOverlay: "20",
      opacityZero: "0",
      opacityFull: "1",
      cursorPointer: "pointer",
      disableBorder: "none",
      disableOutline: "none",
      transitionSpeed: "0.2s"
    }
  },

  shell: {
    wrapper: {
      layout: "column",
      alignItemsFrom: "alignCenterStyle",
      backgroundFrom: "pageBackground",
      minHeightFrom: "layoutFullHeight"
    },

    pageContainer: {
      widthFrom: "pageWidth",
      minHeightFrom: "pageMinHeight",
      paddingFrom: "pagePadding",
      backgroundFrom: "white",
      boxShadowFrom: "pageShadow",
      fontFamilyFrom: "fontFamily",
      positionFrom: "positionRelative"
    },

    layoutContent: {
      positionFrom: "positionRelative",
      zIndexFrom: "zIndexFront"
    },

    layoutContainer: {
      layout: "row"
    },

    saveBar: {
      layout: "row",
      justifyFrom: "flexEndStyle",
      widthFrom: "fullWidth",
      maxWidthFrom: "saveBarMaxWidth"
    },

    errorBanner: {
      widthFrom: "fullWidth",
      paddingFrom: "errorPadding",
      backgroundFrom: "hoverBackground",
      marginBottomFrom: "errorMarginBottom"
    },

    deleteBtn: {
      positionFrom: "positionAbsolute",
      zIndexFrom: "zIndexOverlay"
    },

    prefixStyle: {},
    suffixStyle: {},
    emptyRenderer: {}
  },

  layoutConfig: {
    columnGapFrom: "smallGap",
    columns: [
      { widthFrom: "fullWidth", structure: {} }
    ]
  },

  decorations: [],

  structure: {
    type: FieldType.Group,
    layout: "column",
    gapFrom: "sectionGap",
    children: [

      // HEADER
      {
        type: FieldType.Group,
        layout: "column",
        align: "center",
        gapFrom: "headerGap",
        children: [
          {
            type: FieldType.Text,
            binding: "resume.name",
            style: {
              fontSizeFrom: "nameSize",
              fontWeightFrom: "fontWeightBold",
              textTransformFrom: "textTransformUppercase",
              colorFrom: "primary"
            }
          },
          {
            type: FieldType.Text,
            binding: "resume.role",
            style: {
              fontSizeFrom: "roleSize",
              fontWeightFrom: "fontWeightMedium",
              colorFrom: "textSecondary"
            }
          },
          {
            type: FieldType.Text,
            binding: "resume.location",
            style: {
              fontSizeFrom: "smallSize",
              colorFrom: "textSecondary"
            }
          }
        ]
      },

      // ABOUT
      {
        type: FieldType.Group,
        layout: "column",
        gapFrom: "itemGap",
        children: [
          {
            type: FieldType.Text,
            staticValueFrom: "aboutMe",
            static: true,
            style: {
              fontSizeFrom: "sectionTitleSize",
              fontWeightFrom: "fontWeightBold",
              textTransformFrom: "textTransformUppercase"
            },
            border: {
              position: "bottom",
              width: "1px",
              style: "solid",
              colorFrom: "borderColorPrimary"
            }
          },
          {
            type: FieldType.Text,
            binding: "resume.summary",
            style: {
              fontSizeFrom: "bodySize",
              lineHeightFrom: "lineHeightBody",
              colorFrom: "textPrimary"
            }
          }
        ]
      },

      // EDUCATION
      {
        type: FieldType.List,
        titleFrom: "education",
        binding: "resume.education",
        repeatable: true,
        listContainerStyle: {
          layout: "column",
          gapFrom: "itemGap"
        },
        fields: [
          {
            type: FieldType.Text,
            binding: "institution",
            style: { fontWeightFrom: "fontWeightBold" }
          },
          {
            type: FieldType.Text,
            binding: "degree"
          }
        ]
      },

      // EXPERIENCE
      {
        type: FieldType.List,
        titleFrom: "workExperience",
        binding: "resume.experience",
        repeatable: true,
        listContainerStyle: {
          layout: "column",
          gapFrom: "itemGap"
        },
        fields: [
          {
            type: FieldType.Text,
            binding: "company",
            style: { fontWeightFrom: "fontWeightBold" }
          },
          {
            type: FieldType.Text,
            binding: "position",
            style: { fontWeightFrom: "fontWeightMedium" }
          },
          {
            type: FieldType.List,
            binding: "description",
            repeatable: true
          }
        ]
      },

      // SKILLS
      {
        type: FieldType.List,
        titleFrom: "skills",
        binding: "resume.skills",
        repeatable: true,
        listContainerStyle: {
          layout: "row",
          gapFrom: "smallGap",
          isWrap: true
        }
      }
    ]
  }
};
  errorMsg: string = '';


  ngOnInit(): void {
    this.http.getApi<any>('resume').subscribe({
      next: (response) => {
        if (response && response.data) {
          this.resume = response.data;
        } else {
          // Fallback if structure maps outside 'data' container
          this.resume = response; 
        }
      },
      error: (err) => {
        this.errorMsg = "Failed to load resume data: " + (err.message || 'Server Error');
        console.error("Resume Load Error:", err);
      }
    });
  }

  getThemeCssVariables(): SafeStyle {
    let cssVarString = '';
    const theme = this.templateConfig.theme;
    
    Object.keys(theme).forEach(groupKey => {
      const g = theme[groupKey];
      if (typeof g === 'object') {
        Object.keys(g).forEach(key => {
          cssVarString += `--${groupKey}-${key}: ${g[key]}; `;
        });
      }
    });
    
    return this.sanitizer.bypassSecurityTrustStyle(cssVarString);
  }

  updateValue(event: any, binding: string, context: any, parentArray: any, index: number | null): void {
    if (this.templateConfig.renderMode !== 'edit') return;
    const newValue = event.target.innerText;
                        
    if (binding === '$this' && parentArray && index !== null) {
      if (parentArray[index] !== newValue) {
        parentArray[index] = newValue;
      }
      return;
    }
    
    let obj = context;
    let path = binding;
    if (path.startsWith('resume.')) {
      obj = this.resume;
      path = path.substring(7);
    }
    
    const parts = path.split('.');
    const lastPart = parts.pop();
    if (!lastPart) return;
    
    for (const part of parts) {
      if (obj && typeof obj === 'object') {
        obj = obj[part];
      } else {
        return;
      }
    }
    
    if (obj && typeof obj === 'object') {
      obj[lastPart] = newValue;
    }
  }

  updateListValue(event: any, binding: string, context: any, index: number): void {
    if (this.templateConfig.renderMode !== 'edit') return;
    let val = event.target.innerText;
    let arr = this.resolvePath(context, binding);
    if (Array.isArray(arr)) {
      arr[index] = val;
    }
  }

  getBoundValue(binding: string, context: any, fallbackBinding?: string): any {
    if (!binding || !this.resume) return '';
    if (binding === '$this') {
      return context;
    }
    
    let val = this.resolvePath(context, binding);
    if ((val === undefined || val === null || val === '') && fallbackBinding) {
      val = this.resolvePath(context, fallbackBinding);
    }
    return val;
  }

  getArray(binding: string, context?: any): any[] {
    let target = context || this.resume;
    let val = this.resolvePath(target, binding);
    return Array.isArray(val) ? val : [];
  }

  deleteItem(parentArray: any[], index: number): void {
    if (this.templateConfig.renderMode !== 'edit') return;
    if (Array.isArray(parentArray)) {
      parentArray.splice(index, 1);
    }
  }

  resolvePath(obj: any, path: string): any {
    if (!obj || !path) return '';
    if (path.startsWith('resume.')) {
      obj = this.resume;
      path = path.substring(7);
    }
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current && typeof current === 'object') {
        current = current[part];
      } else {
        return '';
      }
    }
    return current === undefined || current === null ? '' : current;
  }

  saveResume(): void {
    console.log(this.resume);
  }
}
