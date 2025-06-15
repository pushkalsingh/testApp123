import { Component } from '@angular/core';
import { Header } from "./shared/header/header";

@Component({
  selector: 'app-root',
  imports: [ Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'testProject';
}
