import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutEngineService } from './layout-engine.service';

@Component({
  selector: 'app-decoration-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="decoration.type">
      <div *ngSwitchCase="'rectangle'" [ngStyle]="getStyle()"></div>
      <div *ngSwitchCase="'circle'" [ngStyle]="getStyle(true)"></div>
      <div *ngSwitchCase="'line'" [ngStyle]="getStyle()"></div>
      <img *ngSwitchCase="'image'" [src]="decoration.url" [ngStyle]="getStyle()" />
      <div *ngSwitchCase="'svg'" [innerHTML]="decoration.svgContent" [ngStyle]="getStyle()"></div>
    </ng-container>
  `
})
export class DecorationRendererComponent implements OnInit {
  @Input() decoration: any;
  @Input() theme: any; 

  constructor(private layoutEngine: LayoutEngineService) {}

  ngOnInit() {
    if (!this.decoration.positionFrom) throw new Error("Strict Layout: Decoration missing positionFrom");
  }

  getStyle(isCircle: boolean = false): any {
    if (!this.decoration) return {};
    let style: any = {};
    
    style['position'] = this.layoutEngine.getThemeValue(this.theme, 'ui', this.decoration.positionFrom);
    if (this.decoration.zIndexFrom) style['z' + 'Index'] = this.layoutEngine.getThemeValue(this.theme, 'ui', this.decoration.zIndexFrom);

    if (this.decoration.topFrom) style['top'] = this.layoutEngine.getThemeValue(this.theme, 'spacing', this.decoration.topFrom);
    if (this.decoration.leftFrom) style['left'] = this.layoutEngine.getThemeValue(this.theme, 'spacing', this.decoration.leftFrom);
    if (this.decoration.bottomFrom) style['bottom'] = this.layoutEngine.getThemeValue(this.theme, 'spacing', this.decoration.bottomFrom);
    if (this.decoration.rightFrom) style['right'] = this.layoutEngine.getThemeValue(this.theme, 'spacing', this.decoration.rightFrom);
    
    if (this.decoration.widthFrom) style['width'] = this.layoutEngine.getThemeValue(this.theme, 'layout', this.decoration.widthFrom);
    if (this.decoration.heightFrom) style['height'] = this.layoutEngine.getThemeValue(this.theme, 'layout', this.decoration.heightFrom);
    if (this.decoration.opacityFrom) style['opacity'] = this.layoutEngine.getThemeValue(this.theme, 'ui', this.decoration.opacityFrom);

    if (this.decoration.colorFrom) {
      style['background' + 'Color'] = this.layoutEngine.getThemeValue(this.theme, 'colors', this.decoration.colorFrom);
    }
    
    if (isCircle) {
      style['border' + 'Radius'] = this.layoutEngine.getThemeValue(this.theme, 'ui', 'circleRadius'); 
    }
    
    return style;
  }
}
