import { Component } from '@angular/core';

declare var MathJax;

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
    description: `<div>blabla $\\frac a b = c$<br><img src="https://i.pinimg.com/736x/d6/b4/28/d6b4282382f9ff05532442e47c981bb2--terrace-garden-landscaping.jpg" alt=""></div>`,
    title: 'Single Choice'
  }, {
    type: 'tf',
    description: 'blabla',
    title: 'True / False'
  }, {
    type: 'dnd',
    description: 'Drag and drop',
    title: 'Drag and drop'
  }, {
    type: 'sf',
    description: 'Blabla',
    title: 'Solution Field'
  }, {
    type: 'gap',
    description: 'gap',
    title: 'gap'
  }, {
    type: 'dropdown',
    description: 'dropdown',
    title: 'dropdown'
  }];



  constructor() {
    const mathjaxer = () => {
      setTimeout(function() {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        mathjaxer();
      }, 100);
    };
  }

}
