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
    description: `<div>$\\frac{4}{3}$ ist dasselbe wie</div>`,
    title: 'Multiple Choice'
  }, {
    type: 'sc',
    description: `<div>Der Garten von Familie Beckmann liegt an einem Hang. Er besteht aus vier Terrassen, die durch Treppen verbunden werden sollen. Alle Stufen sollen gleich hoch werden. Wie hoch kann eine Stufe höchstens werden?
    <br><br>
    <img src="https://www.taskbase.com/api/file?id=BgFaKhVkcRkZd" height=200px alt=""></div>`,
    title: 'Single Choice'
  }, {
    type: 'tf',
    description: 'Entscheide ob die Aussagen richtig oder falsch sind.',
    title: 'True / False'
  }, {
    type: 'dnd',
    description: 'Drag and drop',
    title: 'Ziehe die Feleder an die richtige Position.'
  }, {
    type: 'sf',
    description: 'Gib die Funktion an, welche entlang der x-Achse verläuft.',
    title: 'Solution Field'
  }, {
    type: 'gap',
    description: 'Fülle die Lücken mit den richtigen Anworten.',
    title: 'gap'
  }, {
    type: 'dropdown',
    description: 'Wähle die richtige Antwort.',
    title: 'dropdown'
  }, {
    type: 'linfun',
    description: 'Linear function',
    title: 'Plot linear function'
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
