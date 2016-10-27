import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[expandFocus]'
})

export class ExpandFocus {
    constructor(private el: ElementRef, private renderer: Renderer) {
        this.expand(1);
        el.nativeElement.classList.add('expand-focus');
    }

    @HostListener('focus') oFocus() {
        this.expand(2);
    }

    @HostListener('blur') onBlur() {
        this.expand(1);
    }

    private expand(rows: number): void {
        this.renderer.setElementAttribute(this.el.nativeElement, 'rows', rows.toString());
    }
}
