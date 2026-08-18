import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { COURSE } from '../course';
import { Lesson, PracticeQuestion, RichLessonBlock, Unit } from '../course.models';
import { FormulaRendererComponent } from '../components/formula-renderer/formula-renderer.component';
import { MathTextComponent } from '../components/math-text/math-text.component';
import { AlgoDsArtifactsComponent } from '../components/interactive-artifacts/algo-ds-artifacts/algo-ds-artifacts.component';

interface QuestionState {
  selected: number | null;
  checked: boolean;
}

const COMPLETION_KEY = 'algorithms-course.completed-lessons.v1';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FormulaRendererComponent,
    MathTextComponent,
    AlgoDsArtifactsComponent
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent implements OnInit, OnDestroy {
  readonly course = COURSE;
  readonly flatLessons = this.course.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({ lesson, unit }))
  );

  unit: Unit = this.course.units[0];
  lesson: Lesson = this.unit.lessons[0];
  currentIndex = 0;
  searchTerm = '';
  menuOpen = false;
  completed = new Set<string>();
  questionStates: Record<string, QuestionState> = {};

  private routeSubscription?: Subscription;
  private svgCache = new Map<string, SafeHtml>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.completed = this.readCompletion();
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const requestedId = params.get('id') || this.flatLessons[0].lesson.id;
      const index = this.flatLessons.findIndex(({ lesson }) => lesson.id === requestedId);
      if (index < 0) {
        void this.router.navigate(['/']);
        return;
      }

      this.currentIndex = index;
      this.lesson = this.flatLessons[index].lesson;
      this.unit = this.flatLessons[index].unit;
      this.questionStates = {};
      this.menuOpen = false;
      document.title = `${this.lesson.title} · ${this.course.title}`;
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  get previousLesson(): Lesson | null {
    return this.flatLessons[this.currentIndex - 1]?.lesson ?? null;
  }

  get nextLesson(): Lesson | null {
    return this.flatLessons[this.currentIndex + 1]?.lesson ?? null;
  }

  get completionPercent(): number {
    return Math.round((this.completed.size / this.flatLessons.length) * 100);
  }

  get lessonPositionPercent(): number {
    return Math.round(((this.currentIndex + 1) / this.flatLessons.length) * 100);
  }

  get estimatedMinutes(): number {
    return this.lesson.estimatedMinutes || this.lesson.durationMinutes || 0;
  }

  visibleLessons(unit: Unit): Lesson[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    if (!query) return unit.lessons;
    return unit.lessons.filter((lesson) =>
      `${unit.title} ${lesson.title} ${lesson.summary}`.toLocaleLowerCase().includes(query)
    );
  }

  hasVisibleLessons(unit: Unit): boolean {
    return this.visibleLessons(unit).length > 0;
  }

  isCompleted(lessonId = this.lesson.id): boolean {
    return this.completed.has(lessonId);
  }

  toggleComplete(): void {
    if (this.completed.has(this.lesson.id)) {
      this.completed.delete(this.lesson.id);
    } else {
      this.completed.add(this.lesson.id);
    }
    this.completed = new Set(this.completed);
    localStorage.setItem(COMPLETION_KEY, JSON.stringify([...this.completed]));
  }

  selectAnswer(question: PracticeQuestion, answerIndex: number): void {
    if (this.questionStates[question.id]?.checked) return;
    this.questionStates[question.id] = { selected: answerIndex, checked: false };
  }

  checkAnswer(question: PracticeQuestion): void {
    const state = this.questionStates[question.id];
    if (!state || state.selected === null) return;
    this.questionStates[question.id] = { ...state, checked: true };
  }

  retryAnswer(question: PracticeQuestion): void {
    this.questionStates[question.id] = { selected: null, checked: false };
  }

  questionState(questionId: string): QuestionState {
    return this.questionStates[questionId] ?? { selected: null, checked: false };
  }

  calloutClass(tone?: RichLessonBlock['tone']): string {
    return `rich-callout--${tone || 'tip'}`;
  }

  trustedSvg(svg?: string): SafeHtml {
    if (!svg) return '';
    const cached = this.svgCache.get(svg);
    if (cached) return cached;
    const safe = this.sanitizer.bypassSecurityTrustHtml(svg);
    this.svgCache.set(svg, safe);
    return safe;
  }

  private readCompletion(): Set<string> {
    try {
      const stored = JSON.parse(localStorage.getItem(COMPLETION_KEY) || '[]');
      if (!Array.isArray(stored)) return new Set();
      const validIds = new Set(this.flatLessons.map(({ lesson }) => lesson.id));
      return new Set(stored.filter((id): id is string => typeof id === 'string' && validIds.has(id)));
    } catch {
      return new Set();
    }
  }
}
