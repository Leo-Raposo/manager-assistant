import { Component } from '@angular/core';
import { PathGeneratorComponent } from './path-generator/path-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PathGeneratorComponent],
  template: `
    <app-path-generator></app-path-generator>
  `,
  styles: []
})
export class AppComponent {
  title = 'manager-assistant';
}