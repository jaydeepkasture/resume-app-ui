import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { ResumeDto } from '../models/resume.model';
import { ResumeTemplate } from '../models/template.model';

/**
 * ResumePreviewService
 *
 * Fetches resume data and template definitions from backend API.
 * Falls back to mock data when no IDs are provided (dev/demo mode).
 *
 * API Endpoints:
 *   GET /resume                  → ResumeDto
 *   GET /templates/{templateId}  → ResumeTemplate
 *   POST /pdf/generate           → PdfResponse
 */

export interface PdfResponse {
  fileName: string;
  contentType: string;
  fileData: string; // Base64 string
}
@Injectable({
  providedIn: 'root'
})
export class ResumePreviewService {

  constructor(private http: HttpService) {}

  // ─── API CALLS ─────────────────────────────────────────────

  /**
   * Fetch resume data from backend.
   */
  getResume(): Observable<ResumeDto> {
    return this.http.getApi<ResumeDto>('resume').pipe(
      map((resume: ResumeDto) => this.normalizeResumeData(resume))
    );
  }

  private normalizeResumeData(resume: ResumeDto): ResumeDto {
    if (!resume) return resume;

    // Ensure experience descriptions are arrays
    if (resume.experience) {
      resume.experience = resume.experience.map(exp => ({
        ...exp,
        description: Array.isArray(exp.description) 
          ? exp.description 
          : (typeof exp.description === 'string' && exp.description ? [exp.description] : [])
      }));
    }

    // Ensure skills is an array
    if (resume.skills) {
      resume.skills = Array.isArray(resume.skills) 
        ? resume.skills 
        : (typeof resume.skills === 'string' && resume.skills ? [resume.skills] : []);
    }

    return resume;
  }

  /**
   * Fetch template definition from backend.
   * If no templateId is provided, returns mock template for development.
   */
  getTemplate(templateId?: string): Observable<ResumeTemplate> {
    if (!templateId) {
      return of(this.getMockTemplate());
    }
    return this.http.getApi<ResumeTemplate>(`templates/${templateId}`);
  }

  /**
   * Generate PDF from resume data and theme.
   */
  generatePdf(themeId: string, resumeData: ResumeDto): Observable<PdfResponse> {
    return this.http.postApi<PdfResponse>('pdf/generate', {
      themeId,
      resume: resumeData
    });
  }

  // ─── MOCK DATA (Development / Demo Fallback) ──────────────

  private getMockResume(): ResumeDto {
    return {
      name: 'May Riley',
      role: 'Restaurant Manager',
      phoneNo: '(716) 555-0100',
      email: 'm.riley@live.com',
      location: '4567 Main Street, Buffalo, New York 98052',
      linkedIn: 'www.linkedin.com/in/m.riley',
      gitHub: '',
      summary:
        'Friendly and engaging team player and leader able to inspire staff to perform their best. Detail oriented and experienced restaurant manager passionate about food and beverages. A multi-tasker who excels at staff training and recruiting with a track record of inspiring great customer service and customer satisfaction. Regularly exceed sales goals. A master in the art of upselling.',

      experience: [
        {
          position: 'Restaurant Manager',
          company: 'Contoso Bar and Grill',
          from: 'September 20XX',
          to: 'Present',
          description: [
            'Recruit, hire, train, and coach over 30 staff members on customer service skills, food & beverage knowledge, sales, and health & safety standards.',
            'Reduced costs by 7% through controls on overtime, operational efficiencies, and reduced waste.',
            'Consistently exceed monthly sales goals by a minimum of 10% by training FOH staff on upselling techniques and by creating a featured food and beverage program.'
          ]
        },
        {
          position: 'Restaurant Manager',
          company: 'Fourth Coffee Bistro',
          from: 'June 20XX',
          to: 'August 20XX',
          description: [
            'Created a cross-training program ensuring FOH staff members were able to perform confidently and effectively in all positions.',
            'Grew customer based and increased restaurant social media accounts by 19% through interactive promotions, engaging postings, and contests.',
            'Created and implemented staff health and safety standards compliance training program, achieving a score of 99% from the Board of Health.',
            'Successfully redesigned existing inventory system, ordering and food storage practices, resulting in a 6% decrease in food waste and higher net profits.'
          ]
        }
      ],

      skills: [
        'Accounting & Budgeting',
        'Proficient with POS systems',
        'Excellent interpersonal and communication skills',
        'Poised under pressure',
        'Experienced in most restaurant positions',
        'Fun and energetic'
      ],

      education: [
        {
          degree: 'B.S.',
          field: 'Business Administration',
          year: 'June 20XX',
          institution: 'Bigtown College, Chicago, Illinois'
        },
        {
          degree: 'A.A.',
          field: 'Hospitality Management',
          year: 'June 20XX',
          institution: 'Bigtown College, Chicago, Illinois'
        }
      ]
    };
  }

  private getMockTemplate(): ResumeTemplate {
    return {
      id: 1,
      name: 'Classic Teal',
      layout: 'single-column',

      sectionOrder: ['summary', 'experience', 'education', 'skills'],

      theme: {
        paper: {
          maxWidth: '800px',
          margin: 'auto'
        },

        colors: {
          primary: '#2f6f73',
          textPrimary: '#333333'
        },

        typography: {
          fontFamily: 'Georgia, serif',

          name: {
            size: '36px',
            weight: 'normal'
          },

          contact: {
            size: '14px'
          },

          sectionTitle: {
            size: '20px',
            weight: 'bold'
          },

          body: {
            size: '14px',
            lineHeight: '1.6'
          },

          jobTitle: {
            transform: 'uppercase',
            weight: 'bold'
          }
        },

        spacing: {
          headerBottom: '15px',
          sectionGap: '25px',
          paragraphGap: '10px',
          listGap: '6px'
        }
      },

      decorations: {
        headerDivider: {
          enabled: true,
          height: '2px',
          color: '#2f6f73',
          marginTop: '10px',
          marginBottom: '15px'
        }
      }
    };
  }
}
