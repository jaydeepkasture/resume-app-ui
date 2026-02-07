import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

export interface ResumeTemplate {
  name: string;
  folder: string;
  path: string;
}

export interface BackendTemplate {
  id: string;
  templateName: string;
  type: number; // 1 = Free Edit (HTML), 2 = Form Edit (Component)
}

export interface TemplateListResponse {
  status: boolean;
  message: string;
  data: BackendTemplate[];
  totalCount?: number;
}

export interface TemplateDetailResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    templateName: string;
    htmlTemplate: string;
  };
}


export interface ResumeExperience {
  position?: string;
  company: string;
  from?: string;
  to?: string;
  description: string;
}

export interface ResumeEducation {
  degree: string;
  field?: string;
  institution: string;
  year: string;
}

export interface ResumeData {
  name: string;
  role: string;
  phoneNo: string;
  email: string;
  location: string;
  linkedIn: string;
  gitHub: string;
  summary: string;
  experience: ResumeExperience[];
  skills: string[];
  education: ResumeEducation[];
  // Allow for other properties during transition or if the backend sends extra data
  [key: string]: any;
}

export interface EnhanceResumeRequest {
  chatId: string;
  templateId?: string; // Added optional templateId
  message: string;
  resumeHtml?: string;
  resumeData: ResumeData;
}

export interface EnhanceResumeResponse {
  status: boolean;
  message: string;
  data?: {
    chatId: string;
    userMessage: string;
    assistantMessage: string;
    currentResume: ResumeData;
    processingTimeMs?: number;
    timestamp?: string;
    enhancedHtml?: string; // Ensure we support enhancedHtml
  };
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templatesBasePath = 'assets/templates';

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) {}

  // Temporary storage for passing data during navigation
  public tempResumeData: ResumeData | null = null;

  setTempResumeData(data: ResumeData) {
      this.tempResumeData = data;
  }
  
  getAndClearTempResumeData(): ResumeData | null {
      const data = this.tempResumeData;
      this.tempResumeData = null;
      return data;
  }

  getTemplates(): Observable<ResumeTemplate[]> {
    return this.http.get<ResumeTemplate[]>(`${this.templatesBasePath}/manifest.json`);
  }

  loadTemplate(templatePath: string): Observable<string> {
    return this.http.get(templatePath, { responseType: 'text' });
  }
  
  loadResumeData(): Observable<ResumeData> {
    return this.http.get<ResumeData>('assets/resume-data.json');
  }

  /**
   * Sends user input and resume data to backend API for AI-powered enhancement
   * @param chatId - The ID of the chat session
   * @param message - The user's enhancement request
   * @param resumeData - The current resume data
   * @param resumeHtml - The current resume HTML (optional)
   * @param templateId - The ID of the current template (optional)
   * @returns Observable with enhanced resume data
   */
  enhanceResume(chatId: string, message: string, resumeData: ResumeData, resumeHtml?: string, templateId?: string): Observable<EnhanceResumeResponse> {
    // Transform data to match API requirements (camelCase)
    const formattedData = {
      name: resumeData.name || '',
      role: resumeData.role || '',
      phoneNo: resumeData['phoneno'] || resumeData.phoneNo || '',
      email: resumeData.email || '',
      location: resumeData.location || '',
      linkedIn: resumeData['linkedin'] || resumeData.linkedIn || '',
      gitHub: resumeData['github'] || resumeData.gitHub || '',
      summary: resumeData.summary || '',
      experience: resumeData['experiance'] || resumeData.experience || [], // Handle typo
      skills: resumeData.skills || [],
      education: resumeData['eduction'] || resumeData.education || []   // Handle typo
    };

    const payload: EnhanceResumeRequest = {
      chatId,
      templateId, // Include templateId
      message,
      resumeHtml,
      resumeData: formattedData
    };

    return this.httpService.post<EnhanceResumeResponse>(
      'resume/chat/enhance',
      payload
    );
  }

  /**
   * Get chat session details including resume data
   * @param chatId - The ID of the chat session
   * @returns Observable with chat session details
   */
  getChatSession(chatId: string): Observable<any> {
    return this.httpService.get(`resume/chat/${chatId}`);
  }

  /**
   * Create a new chat session for a specific template
   * @param templateId - The ID of the template
   * @returns Observable with chat session details
   */
  createChatSession(templateId: string): Observable<any> {
    return this.httpService.post('resume/chat/create', { templateId });
  }

  /**
   * Get enhancement history for a specific chat session
   * @param chatId - The ID of the chat session
   * @param page - Page number (default 1)
   * @param pageSize - Page size (default 20)
   * @param templateId - Optional template ID
   * @returns Observable with history data
   */
  getChatHistory(chatId: string, page: number = 1, pageSize: number = 20, sortOrder: string = 'desc', search: string = ''): Observable<any> {
    let url = `resume/chat/${chatId}/history?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return this.httpService.get(url);
  }

  /**
   * Get specific history detail
   * @param historyId - The ID of the history item
   * @returns Observable with history details
   */
  getHistoryDetail(historyId: string): Observable<any> {
    return this.httpService.get(`resume/chat/history/${historyId}`);
  }

  /**
   * Get templates from backend API with pagination and search
   * @param page - Page number (default 1)
   * @param pageSize - Page size (default 10)
   * @param sortOrder - Sort order (default 'asc')
   * @param search - Search query (optional)
   * @returns Observable with template list
   */
  getBackendTemplates(page: number = 1, pageSize: number = 10, sortOrder: string = 'asc', search: string = ''): Observable<TemplateListResponse> {
    let url = `template/list?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return this.httpService.get<TemplateListResponse>(url);
  }

  /**
   * Get template HTML by template ID
   * @param templateId - The ID of the template
   * @returns Observable with template HTML
   */
  getTemplateById(templateId: string): Observable<TemplateDetailResponse> {
    return this.httpService.get<TemplateDetailResponse>(`template/${templateId}`);
  }

  /**
   * Save the current resume state
   * @param resumeData - The resume data to save
   * @param templateId - The template ID
   * @param chatId - The chat ID
   * @returns Observable with the save response
   */
  saveResume(resumeData: ResumeData, templateId: string, chatId: string): Observable<any> {
    const formattedData = {
      name: resumeData.name || '',
      role: resumeData.role || '',
      phoneNo: resumeData['phoneno'] || resumeData.phoneNo || '',
      email: resumeData.email || '',
      location: resumeData.location || '',
      linkedIn: resumeData['linkedin'] || resumeData.linkedIn || '',
      gitHub: resumeData['github'] || resumeData.gitHub || '',
      summary: resumeData.summary || '',
      experience: resumeData['experiance'] || resumeData.experience || [],
      skills: resumeData.skills || [],
      education: resumeData['eduction'] || resumeData.education || [],
      ...(resumeData as any) // Include any other properties
    };
    
    return this.httpService.put(`resume/save?chatId=${chatId}&templateId=${templateId}`, resumeData);
  }
}
