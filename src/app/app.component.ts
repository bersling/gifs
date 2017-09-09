import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks = [{
    type: 'mc',
    description: `<div>Blabla</div>`,
    title: 'Multiple Choice'
  }, {
    type: 'sc',
    description: `
<div>
blabla
<br>
<img src="https://i.pinimg.com/736x/d6/b4/28/d6b4282382f9ff05532442e47c981bb2--terrace-garden-landscaping.jpg" alt="">
</div>`,
    title: 'Single Choice'
  }];

}
