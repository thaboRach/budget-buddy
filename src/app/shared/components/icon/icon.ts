import { Component, input } from '@angular/core';

/**
 * Reusable Icon component for displaying SVG icons
 *
 * @export
 * @class Icon
 * @typedef {Icon}
 */
@Component({
  selector: 'svg[app-icon]',
  template: ` <svg:use [attr.href]="iconUrl" width="100%" height="100%"></svg:use> `,
  styles: [
    `
      :host {
        display: inline-block;
        width: 1em;
        height: 1em;
        fill: currentColor;
      }
    `,
  ],
})
export class Icon {
  name = input.required<string>();

  get iconUrl() {
    return `assets/${this.name()}.svg`;
  }
}
