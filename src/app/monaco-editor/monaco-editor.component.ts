import {
  Component, ElementRef, Input, Output, EventEmitter,
  AfterViewInit, OnDestroy, ViewChild, Inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-monaco-editor',
  template: `<div #editorContainer class="monaco-container"></div>`,
  styles: [`
    .monaco-container {
      width: 100%;
      height: 100%;
      min-height: 300px;
    }
  `]
})
export class MonacoEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer', { static: true }) container!: ElementRef;
  @Input() code: string = '';
  @Input() language: string = 'java';
  @Input() readOnly: boolean = false;
  @Output() codeChange = new EventEmitter<string>();

  private editor: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    await this.loadMonacoCss();
    const monaco = await this.loadMonaco();
    this.createEditor(monaco);
  }

  private async loadMonacoCss(): Promise<void> {
    const linkId = 'monaco-css';
    if (document.getElementById(linkId)) return;
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/editor/editor.main.min.css';
    document.head.appendChild(link);
  }

  private async loadMonaco(): Promise<any> {
    const amdRequire = (window as any).require;
    if ((window as any).monaco) return (window as any).monaco;

    await this.loadScript('https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs/loader.js');

    return new Promise((resolve) => {
      const req = (window as any).require;
      req.config({
        paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs' }
      });
      req(['vs/editor/editor.main'], () => {
        const monaco = (window as any).monaco;
        this.defineCustomTheme(monaco);
        resolve(monaco);
      });
    });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  private defineCustomTheme(monaco: any): void {
    monaco.editor.defineTheme('customDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'constant', foreground: '4FC1FF' },
        { token: 'operator', foreground: 'D4D4D4' },
      ],
      colors: {
        'editor.background': '#0d0e1a',
        'editor.foreground': '#e2e8f0',
        'editor.lineHighlightBackground': '#1a1b2e',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#1a3a5c',
        'editorCursor.foreground': '#6366f1',
        'editorLineNumber.foreground': '#4a5568',
        'editorLineNumber.activeForeground': '#818cf8',
        'editor.selectionHighlightBackground': '#2a2d4a',
        'editorBracketMatch.background': '#2a2d4a',
        'editorBracketMatch.border': '#6366f1',
        'editorGutter.background': '#0d0e1a',
      },
    });
  }

  private createEditor(monaco: any): void {
    if (!this.container) return;

    this.editor = monaco.editor.create(this.container.nativeElement, {
      value: this.code || '',
      language: this.mapLanguage(this.language),
      theme: 'customDark',
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      lineNumbers: 'on',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true,
      tabSize: 4,
      readOnly: this.readOnly,
      renderLineHighlight: 'line',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      smoothScrolling: true,
      padding: { top: 16, bottom: 16 },
      bracketPairColorization: { enabled: true },
      autoIndent: 'full',
      formatOnPaste: true,
    });

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      this.codeChange.emit(value);
    });
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  private mapLanguage(lang: string): string {
    const map: Record<string, string> = {
      java: 'java',
      python: 'python',
      javascript: 'javascript',
      js: 'javascript',
      cpp: 'cpp',
      'c++': 'cpp',
      typescript: 'typescript',
    };
    return map[lang.toLowerCase()] || 'plaintext';
  }
}
