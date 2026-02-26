import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Theme, ThemeListResponse, ThemeDetailResponse } from './models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private baseUrl = 'themes';

  constructor(private httpService: HttpService) {}

  /**
   * Get paginated list of active themes
   */
  getThemes(page: number = 1, pageSize: number = 10, search: string = '', layoutType: string = ''): Observable<ThemeListResponse> {
    let url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    if (layoutType) {
      url += `&layoutType=${encodeURIComponent(layoutType)}`;
    }
    return this.httpService.get<ThemeListResponse>(url);
  }

  /**
   * Get a specific theme by ID
   */
  getThemeById(id: string): Observable<ThemeDetailResponse> {
    return this.httpService.get<ThemeDetailResponse>(`${this.baseUrl}/${id}`);
  }

  /**
   * Add a new theme
   */
  createTheme(theme: Partial<Theme>): Observable<ThemeDetailResponse> {
    return this.httpService.post<ThemeDetailResponse>(this.baseUrl, theme);
  }

  /**
   * Update an existing theme
   */
  updateTheme(id: string, theme: Partial<Theme>): Observable<ThemeDetailResponse> {
    return this.httpService.put<ThemeDetailResponse>(`${this.baseUrl}/${id}`, theme);
  }

  /**
   * Delete a theme
   */
  deleteTheme(id: string): Observable<any> {
    return this.httpService.delete(`${this.baseUrl}/${id}`);
  }
}
