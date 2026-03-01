import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { LayoutConfig, LayoutListResponse } from '../resume-preview/models/layout.model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private baseUrl = 'layouts';

  constructor(private httpService: HttpService) {}

  /**
   * Fetch layout configuration by ID
   * We use a fallback if the backend API isn't ready yet, so the UI doesn't break
   */
  getLayoutConfig(layoutId: string): Observable<LayoutConfig> {
    return this.httpService.get<any>(`${this.baseUrl}/${layoutId}`).pipe(
      map(response => {
        const data = response.data || response; // Handle standard API wrapper
        return this.mapBackendToLayoutConfig(data);
      }),
      catchError(err => {
        console.warn(`[LayoutService] Failed to fetch layout from backend, using fallback for: ${layoutId}`);
        return of(this.getFallbackLayout(layoutId));
      })
    );
  }

  /**
   * Fetch a paginated list of layouts
   */
  getLayouts(page: number = 1, pageSize: number = 10, search: string = ''): Observable<LayoutListResponse> {
    let url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return this.httpService.get<any>(url).pipe(
      map(response => {
        if (response && Array.isArray(response.data)) {
          response.data = response.data.map((item: any) => this.mapBackendToLayoutConfig(item));
        } else if (Array.isArray(response)) {
          return {
            status: true,
            message: "Success",
            data: response.map((item: any) => this.mapBackendToLayoutConfig(item))
          };
        }
        return response as LayoutListResponse;
      }),
      catchError(err => {
        console.warn(`[LayoutService] Failed to fetch layout list from backend`);
        // Provide a fallback response with the hardcoded layout as the only option
        return of({
          status: false,
          message: "Fallback data used",
          data: [this.getFallbackLayout('single-column')],
          totalCount: 1
        });
      })
    );
  }

  private mapBackendToLayoutConfig(backendData: any): LayoutConfig {
    if (!backendData) return backendData;
    
    // Create a new object to avoid mutating the original
    const config: any = { ...backendData };
    
    // Map layout_id to layoutId
    if (config.layout_id !== undefined) {
      config.layoutId = config.layout_id;
      // Note: we can delete config.layout_id but keeping it is harmless
    }
    
    // Map header sub-properties
    if (config.header) {
      if (config.header.contact && config.header.contact.visible_fields) {
        config.header.contact.visibleFields = config.header.contact.visible_fields;
      }
      
      if (config.header.divider) {
        if (config.header.divider.margin_top !== undefined) {
          config.header.divider.marginTop = config.header.divider.margin_top;
        }
        if (config.header.divider.margin_bottom !== undefined) {
          config.header.divider.marginBottom = config.header.divider.margin_bottom;
        }
      }
    }
    
    return config as LayoutConfig;
  }

  private getFallbackLayout(layoutId: string): LayoutConfig {
    return {
      layoutId: layoutId,
      name: "Standard Single Column",
      styles: {
        fontFamily: "'Inter', 'Roboto', sans-serif",
        primaryColor: "#000000",
        textPrimary: "#333333",
        headerBottom: "16px",
        sectionGap: "24px"
      },
      header: {
        alignment: "center",
        name: {
          visible: true,
          size: "36px",
          weight: "700"
        },
        contact: {
          visible: true,
          size: "14px",
          separator: "|",
          visibleFields: ["location", "phoneNo", "email", "linkedIn", "gitHub"]
        },
        divider: {
          enabled: true,
          color: "#000000",
          height: "2px",
          marginTop: "8px",
          marginBottom: "24px",
          width: "100%"
        }
      },
      sections: [
        { type: "summary", enabled: true, title: "Professional Summary" },
        { type: "experience", enabled: true, title: "Work Experience" },
        { type: "education", enabled: true, title: "Education" },
        { type: "skills", enabled: true, title: "Core Skills" }
      ]
    };
  }
}
