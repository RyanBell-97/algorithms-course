export interface Course {
  id: string;
  title: string;
  subjectId: string;
  level: string;
  language: string;
  summary: string;
  coverColor: string;
  estimatedHours: number;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  unitId: string;
  order: number;
  title: string;
  durationMinutes: number;
  estimatedMinutes?: number;
  type: 'video' | 'practice' | 'quiz' | 'interactive';
  summary: string;
  richContent: RichLessonBlock[];
  practice?: PracticeQuestion[];
}

export interface PracticeQuestion {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface ExerciseItem {
  id: string;
  source?: string;
  question: string;
  solution?: string;
}

export interface RichLessonBlock {
  type: 'heading' | 'paragraph' | 'callout' | 'formula' | 'code' | 'diagram' | 'table' | 'list' | 'interactive' | 'exercises';
  artifact?: string;
  text?: string;
  title?: string;
  level?: 2 | 3;
  tone?: 'intuition' | 'warning' | 'proof' | 'tip';
  latex?: string;
  display?: boolean;
  language?: string;
  code?: string;
  svg?: string;
  caption?: string;
  columns?: string[];
  rows?: string[][];
  items?: string[];
  exercises?: ExerciseItem[];
  difficulty?: 'easy' | 'medium' | 'hard';
}
