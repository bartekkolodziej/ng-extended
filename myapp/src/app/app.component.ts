import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
cars= [{name: "car1"},
            {name: "car2"},
            {name: "car3"},
            {name: "car4"},
            {name: "car5"},
            {name: "car6"}
             ];

car : string;

 

  title = 'myapp';

}
