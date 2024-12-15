import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, retryWhen, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class QaService {
  private socket$!: WebSocketSubject<any>;

  private loadingSubject = new BehaviorSubject<boolean | null>(false);
  public loading$: Observable<boolean | null> = this.loadingSubject.asObservable();

  public feedbackData$: Observable<any>;

  constructor() {
    this.socket$ = webSocket("ws://localhost:8000/ws");
    this.feedbackData$ = this.socket$!.asObservable().pipe(
      tap((data)=> console.log(data)),
      map((data) => this.processFeedbackData(JSON.parse(data))),
      tap(() => this.loadingSubject.next(false))
    );
  }


  public sendMessage(message: string): void {
    this.loadingSubject.next(true);
    this.socket$.next({ url: message });
  }

  
  private processFeedbackData(data: any): any {
    const panels = [];

    if (data.HtmlEvaluation) {
      panels.push({
        title: "HTML Evaluation",
        score: data.HtmlEvaluation.global_score,
        feedback: [data.HtmlEvaluation.feedback],
        issues:
          data.HtmlEvaluation.issues?.map(
            (issue: any) =>
              `The following lines ${issue.lines?.join(
                ", "
              )} are affected with ${issue.issue_type}.`
          ) || [],
      });
    }

    if (data.AccessibilityEvaluation) {
      panels.push({
        title: "Accessibility Evaluation",
        score: data.AccessibilityEvaluation.global_score,
        feedback: [data.AccessibilityEvaluation.feedback],
        issues:
          data.AccessibilityEvaluation.issues?.map(
            (issue: any) =>
              `Description: ${issue.description}, Severity: ${issue.impact}, Number of affected elements: ${issue.affected_elements_count}`
          ) || [],
      });
    }

    if (data.TextEvaluation) {
      panels.push({
        title: "Text Evaluation",
        score: data.TextEvaluation.grammar_and_spelling_issues?.score,
        feedback: data.TextEvaluation.feedback,
        issues: [
          data.TextEvaluation.grammar_and_spelling_issues?.details,
          data.TextEvaluation.text_structure_evaluation,
        ].filter(Boolean),
      });
    }

    return panels;
  }
}
