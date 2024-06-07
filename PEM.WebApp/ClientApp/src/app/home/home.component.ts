import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  query: string = '';
  isSearched: boolean = false;
  results: any[] = [];
  copySuccess: boolean[] = [];

  constructor(private dataService: DataService, private clipboard: Clipboard) {}

  search() {
    this.isSearched = true;
    if (this.query.trim() === '') {
      this.results = [];
      return;
    }

    this.dataService.searchErrors(this.query).subscribe((data) => {
      this.results = data;
      this.copySuccess = new Array(data.length).fill(false); // Initialize copy success state for each result
    });
  }

  onInputChange() {
    this.isSearched = false;
    if (this.query.trim() === '') {
      this.results = [];
    }
  }

  copyExample(example: string, index: number) {
    this.clipboard.copy(example);
    this.copySuccess[index] = true;
    setTimeout(() => {
      this.copySuccess[index] = false;
    }, 2000); // Hide success message after 2 seconds
  }
}
