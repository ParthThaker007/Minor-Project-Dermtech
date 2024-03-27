import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
  name='Parth';
  a=10;
  b=20;
  lastName = 'Thaker';
  cols=3;
  border = 2;
  data:string='twoway';
  showdata(){
    document.write('This is event binding');
  }
}
