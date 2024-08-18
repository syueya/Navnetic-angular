import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-my-svg',
  standalone: true,
  imports: [],
  templateUrl: './my-svg.component.html',
  styleUrl: './my-svg.component.scss'
})
export class MySvgComponent {
  @Input() iconId!: string;
  @Input() size: string = '24px';
  @Input() fillColor: string = 'white'; // 默认颜色

}
