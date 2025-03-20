import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  imports: [CommonModule, FormsModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  files: File[] = [];
  results: { name: string; score: number; skills: string }[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileSelect(event: any) {
    this.addFiles(event.target.files);
  }

  addFiles(fileList: FileList) {
    Array.from(fileList).forEach(file => this.files.push(file));
  }

  analyzeFiles() {
    // Replace this part with a real backend call to your springboot service
    this.results = this.files.map(file => ({
      name: file.name.split('.')[0],
      score: Math.floor(Math.random() * 40 + 60), // Random score for mock
      skills: 'Leadership, Java, Communication' // Static skills for mock
    }));
  }
}
