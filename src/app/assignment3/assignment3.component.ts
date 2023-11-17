import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrl: './assignment3.component.css'
})

export class Assignment3Component {
  display = false;
  itr = 2;
  clicks = [1, 2];

  onToggleDisplay() {
    this.display = !this.display;
    this.clicks.push(this.itr + 1);
    this.itr++;
  }

  getColor() {
    return this.clicks.length >= 5 ? 'blue' : 'white';
  }


}
