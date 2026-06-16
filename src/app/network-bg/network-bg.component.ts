import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
  HostListener,
  Input,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
  branch: number;
  opacity: number;
}

interface Pulse {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
}

@Component({
  selector: 'app-network-bg',
  template: `<canvas #canvas [style.width]="'100%'" [style.height]="'100%'"></canvas>`,
  styles: [`
    :host {
      position: absolute;
      inset: 0;
      display: block;
      pointer-events: none;
      z-index: 0;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class NetworkBgComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() color = '#6366f1';
  @Input() nodeCount = 40;
  @Input() connectionDistance = 180;
  @Input() scrollEnabled = true;

  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private pulses: Pulse[] = [];
  private animationId = 0;
  private scrollProgress = 0;
  private mouseX = 0;
  private mouseY = 0;
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.canvasRef?.nativeElement) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.ctx = ctx;
    this.initialized = true;
    this.resize();
    this.initNodes();
    if (this.scrollEnabled) {
      this.updateScrollProgress();
    }
    this.animate(0);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('window:resize')
  resize(): void {
    if (!this.initialized || !isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement?.getBoundingClientRect() ?? {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.nodes.length) {
      this.repositionNodes(rect.width, rect.height);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.scrollEnabled || !this.initialized) return;
    this.updateScrollProgress();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  private updateScrollProgress(): void {
    const docEl = document.documentElement;
    const scrollTop = window.scrollY || docEl.scrollTop;
    const scrollHeight = docEl.scrollHeight - window.innerHeight;
    this.scrollProgress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
  }

  private initNodes(): void {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.width;
    const h = canvas.height;
    this.nodes = [];
    for (let i = 0; i < this.nodeCount; i++) {
      this.nodes.push(this.createNode(w, h, i));
    }
    this.connectNodes();
  }

  private createNode(w: number, h: number, index: number): Node {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      radius: 1.5 + Math.random() * 2.5,
      connections: [],
      branch: Math.floor(Math.random() * 4),
      opacity: 0.3 + Math.random() * 0.5,
    };
  }

  private repositionNodes(w: number, h: number): void {
    for (const node of this.nodes) {
      node.x = Math.random() * w;
      node.y = Math.random() * h;
    }
    this.connectNodes();
  }

  private connectNodes(): void {
    for (const node of this.nodes) {
      node.connections = [];
    }
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.connectionDistance) {
          this.nodes[i].connections.push(j);
          this.nodes[j].connections.push(i);
        }
      }
    }
  }

  /**
   * getPulsePath - Maps scroll progress (0 to 1) to a 2D position
   * within the network by interpolating between consecutive nodes.
   * Uses sinusoidal drift to create organic, non-linear motion.
   */
  private getPulsePath(progress: number): { x: number; y: number } | null {
    if (this.nodes.length < 2) return null;

    const idx = Math.floor(progress * (this.nodes.length - 1));
    const nextIdx = Math.min(idx + 1, this.nodes.length - 1);

    const nodeA = this.nodes[idx];
    const nodeB = this.nodes[nextIdx];
    if (!nodeA || !nodeB) return null;

    const t = progress * (this.nodes.length - 1) - idx;
    const driftX = Math.sin(progress * Math.PI * 4) * 20;
    const driftY = Math.cos(progress * Math.PI * 3) * 15;

    return {
      x: nodeA.x + (nodeB.x - nodeA.x) * t + driftX,
      y: nodeA.y + (nodeB.y - nodeA.y) * t + driftY,
    };
  }

  /**
   * animate - Main render loop using requestAnimationFrame.
   * Draws the network on a canvas: nodes as glowing dots, edges as
   * subtle lines, and a bright pulse (the "glowing dot") that moves
   * along a path determined by scroll position. All coordinates are
   * recalculated each frame against device-independent dimensions.
   */
  private animate = (timestamp: number): void => {
    if (!this.initialized) return;

    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const time = timestamp * 0.001;

    // Connection lines
    ctx.lineWidth = 0.5;
    this.nodes.forEach((node) => {
      const subtleMoveX = Math.sin(time * 0.5 + this.nodes.indexOf(node)) * 3;
      const subtleMoveY = Math.cos(time * 0.4 + this.nodes.indexOf(node) * 0.7) * 3;
      node.connections.forEach((j) => {
        const target = this.nodes[j];
        if (!target) return;
        ctx.beginPath();
        ctx.moveTo(node.x + subtleMoveX, node.y + subtleMoveY);
        ctx.lineTo(target.x + Math.sin(time * 0.5 + j) * 3,
                   target.y + Math.cos(time * 0.4 + j * 0.7) * 3);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
        ctx.stroke();
      });
    });

    // Nodes with glow
    this.nodes.forEach((node, i) => {
      const subtleMove = Math.sin(time * 0.5 + i) * 3;
      const cx = node.x + subtleMove;
      const cy = node.y + Math.cos(time * 0.4 + i * 0.7) * 3;

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, node.radius * 5);
      glow.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
      glow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, node.radius * 5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
      ctx.fill();
    });

    // Pulsing dot (scroll-driven)
    const pulsePos = this.getPulsePath(this.scrollProgress);
    if (pulsePos) {
      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        pulsePos.x, pulsePos.y, 0,
        pulsePos.x, pulsePos.y, 70
      );
      outerGlow.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
      outerGlow.addColorStop(0.3, 'rgba(99, 102, 241, 0.2)');
      outerGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(pulsePos.x, pulsePos.y, 70, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Inner bright core
      const innerGlow = ctx.createRadialGradient(
        pulsePos.x, pulsePos.y, 0,
        pulsePos.x, pulsePos.y, 20
      );
      innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      innerGlow.addColorStop(0.4, 'rgba(99, 102, 241, 0.7)');
      innerGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(pulsePos.x, pulsePos.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // White core dot
      ctx.beginPath();
      ctx.arc(pulsePos.x, pulsePos.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    this.animationId = requestAnimationFrame(this.animate);
  };
}
