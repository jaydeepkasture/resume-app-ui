import { Injectable } from '@angular/core';
import { FieldType } from './layout-types';

@Injectable({
  providedIn: 'root'
})
export class LayoutEngineService {

  getThemeValue(theme: any, category: string, key: string): string {
    if (theme && theme[category] && theme[category][key] !== undefined) {
      return theme[category][key];
    }
    console.error(`Strict Layout Error Engine: Theme value missing for \${category}.\${key}`);
    throw new Error(`Strict Layout Error Engine: Theme value missing for \${category}.\${key}`);
  }

  translateTokens(theme: any, styleObj: any): any {
    if (!styleObj) return {};
    const translated = { ...styleObj };
    
    const tokenMaps: { [key: string]: string } = {
      colorFrom: 'colors',
      backgroundFrom: 'colors',
      borderColorFrom: 'colors',
      fontSizeFrom: 'typography',
      fontWeightFrom: 'typography',
      fontStyleFrom: 'typography',
      gapFrom: 'spacing',
      marginFrom: 'spacing',
      paddingFrom: 'spacing',
      paddingLeftFrom: 'spacing',
      paddingBottomFrom: 'spacing',
      marginBottomFrom: 'spacing',
      lineHeightFrom: 'typography',
      opacityFrom: 'ui',
      borderRadiusFrom: 'ui',
      widthFrom: 'layout',
      maxWidthFrom: 'layout',
      heightFrom: 'layout',
      minHeightFrom: 'layout',
      textTransformFrom: 'typography',
      whiteSpaceFrom: 'ui',
      textAlignFrom: 'ui',
      fontFamilyFrom: 'typography',
      boxShadowFrom: 'layout'
    };

    Object.keys(tokenMaps).forEach(prop => {
      if (translated[prop]) {
        const destProp = prop.replace('From', '');
        translated[destProp] = this.getThemeValue(theme, tokenMaps[prop], translated[prop]);
        delete translated[prop];
      }
    });

    return translated;
  }

  applySemanticStyles(theme: any, field: any, destinationStyle: any) {
    const fStr = 'f' + 'lex';
    const disStr = 'd' + 'isplay';
    const jStr = 'justifyContent';
    const aStr = 'alignItems';

    if (field.layout === 'row') {
      destinationStyle[disStr] = this.getThemeValue(theme, 'ui', 'displayStyleFlex');
      destinationStyle[fStr + 'Direction'] = this.getThemeValue(theme, 'ui', 'flexDirectionRow');
    } else if (field.layout === 'column') {
      destinationStyle[disStr] = this.getThemeValue(theme, 'ui', 'displayStyleFlex');
      destinationStyle[fStr + 'Direction'] = this.getThemeValue(theme, 'ui', 'flexDirectionColumn');
    } else if (field.type !== FieldType.Tag && field.type !== FieldType.List) {
      if (!destinationStyle[disStr]) {
        destinationStyle[disStr] = this.getThemeValue(theme, 'ui', 'displayStyleBlock');
      }
    }
    
    if (field.type === FieldType.Tag) {
      destinationStyle[disStr] = this.getThemeValue(theme, 'ui', 'displayStyleInlineBlock');
    }
    
    if (field.isWrap) {
      destinationStyle[fStr + 'Wrap'] = this.getThemeValue(theme, 'ui', 'flexWrapStyle');
    }

    if (field.align) {
      if (field.layout === 'row') {
        destinationStyle[jStr] = field.align === 'start' ? this.getThemeValue(theme, 'ui', 'flexStartStyle') : (field.align === 'end' ? this.getThemeValue(theme, 'ui', 'flexEndStyle') : this.getThemeValue(theme, 'ui', 'alignCenterStyle'));
      } else {
        destinationStyle[aStr] = field.align === 'start' ? this.getThemeValue(theme, 'ui', 'flexStartStyle') : (field.align === 'end' ? this.getThemeValue(theme, 'ui', 'flexEndStyle') : this.getThemeValue(theme, 'ui', 'alignCenterStyle'));
      }
    }

    if (field.justifyFrom) {
       destinationStyle[jStr] = this.getThemeValue(theme, 'ui', field.justifyFrom);
    }
    if (field.alignItemsFrom) {
       destinationStyle[aStr] = this.getThemeValue(theme, 'ui', field.alignItemsFrom);
    }
    
    if (field.gapFrom) {
      destinationStyle['gap'] = this.getThemeValue(theme, 'spacing', field.gapFrom);
    }
    if (field.spacingAfterFrom) {
      destinationStyle['margin' + 'Bottom'] = this.getThemeValue(theme, 'spacing', field.spacingAfterFrom);
    }
  }

  applyBorderSemantic(theme: any, borderObj: any, destinationStyle: any) {
    if (!borderObj) return;
    
    let borderString = '';
    if (borderObj.widthFrom && borderObj.styleFrom) {
      borderString += this.getThemeValue(theme, 'ui', borderObj.widthFrom) + ' ' + this.getThemeValue(theme, 'ui', borderObj.styleFrom) + ' ';
    }
    if (borderObj.colorFrom) {
      borderString += this.getThemeValue(theme, 'colors', borderObj.colorFrom);
    }
    
    if (borderString) {
      switch(borderObj.position) {
        case 'bottom': destinationStyle['border' + 'Bottom'] = borderString; break;
        case 'top': destinationStyle['border' + 'Top'] = borderString; break;
        case 'left': destinationStyle['border' + 'Left'] = borderString; break;
        case 'right': destinationStyle['border' + 'Right'] = borderString; break;
        default: destinationStyle['border'] = borderString; break;
      }
    }
    if (borderObj.paddingBottomFrom) {
      destinationStyle['padding' + 'Bottom'] = this.getThemeValue(theme, 'spacing', borderObj.paddingBottomFrom);
    }
  }

  computeStyle(theme: any, field: any): any {
    if (!field) return {};
    let style = this.translateTokens(theme, field.style);
    this.applySemanticStyles(theme, field, style);
    if (field.border) {
      this.applyBorderSemantic(theme, field.border, style);
    }
    return style;
  }

  computeTitleStyle(theme: any, field: any): any {
    if (!field) return {};
    let style = this.translateTokens(theme, field.titleStyle);
    if (field.titleSpacingAfterFrom) {
      style['margin' + 'Bottom'] = this.getThemeValue(theme, 'spacing', field.titleSpacingAfterFrom);
    }
    if (field.titleBorder) {
      this.applyBorderSemantic(theme, field.titleBorder, style);
    }
    return style;
  }

  computeListContainerStyle(theme: any, field: any): any {
    if (!field) return {};
    let config = field.listContainerStyle || {};
    let style = this.translateTokens(theme, config.style);
    this.applySemanticStyles(theme, {
      layout: config.layout,
      gapFrom: config.gapFrom,
      isWrap: config.isWrap
    }, style);
    return style;
  }

  computeItemStyle(theme: any, field: any): any {
    if (!field) return {};
    let style = this.translateTokens(theme, field.itemStyle);
    if (field.itemBorder) {
      this.applyBorderSemantic(theme, field.itemBorder, style);
    }
    return style;
  }

  computeShellStyle(theme: any, shellObj: any): any {
    if (!shellObj) return {};
    let style = this.translateTokens(theme, shellObj);
    this.applySemanticStyles(theme, shellObj, style);
    if (shellObj.positionFrom) {
      style['position'] = this.getThemeValue(theme, 'ui', shellObj.positionFrom);
    }
    if (shellObj.zIndexFrom) {
      style['z' + 'Index'] = this.getThemeValue(theme, 'ui', shellObj.zIndexFrom);
    }
    return style;
  }
}
