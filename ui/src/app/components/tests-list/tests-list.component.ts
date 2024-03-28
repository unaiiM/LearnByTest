import { Component } from '@angular/core';

interface Item {
  name : string;
  description : string;
}

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrl: './tests-list.component.css'
})
export class TestsListComponent {
  list : Item[] = [{
    name: 'Maths',
    description: 'Some tests about maths, including: matrius, etc.',
  }];
}
