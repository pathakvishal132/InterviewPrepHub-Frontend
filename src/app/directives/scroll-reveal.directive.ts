import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealOffset = 60;
  @Input() revealDelay = 0;
  @Input() revealDuration = 700;
  @Input() revealRepeat = false;

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.style.opacity = '1';
      return;
    }
    const el = this.el.nativeElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity ${this.revealDuration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${this.revealDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    el.style.transitionDelay = `${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, this.revealDelay);
            if (!this.revealRepeat && this.observer) {
              this.observer.unobserve(el);
            }
          } else if (this.revealRepeat) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
