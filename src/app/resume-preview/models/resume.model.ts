export interface ExperienceDto {
  position: string;
  company: string;
  from: string;
  to: string;
  description: string[];
}

export interface EducationDto {
  degree: string;
  field: string;
  year: string;
  institution: string;
}

export interface ResumeDto {
  name: string;
  role: string;
  phoneNo: string;
  email: string;
  location: string;
  linkedIn: string;
  gitHub: string;
  summary: string;
  experience: ExperienceDto[];
  skills: string[];
  education: EducationDto[];
}
