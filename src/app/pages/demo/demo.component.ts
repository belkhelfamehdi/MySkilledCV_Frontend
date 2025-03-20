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
  file: File | null = null;
  analysisResult: { name: string; score: number; skills: string } | null = null;

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.file = event.dataTransfer.files[0];
    }
  }

onFileSelect(event: any) {
  const allowedExtensions = ['pdf', 'doc', 'docx'];
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      this.file = file;
    } else {
      alert('Invalid file type. Please upload a .pdf, .doc, or .docx file.');
    }
  }
}


  analyzeFile() {
    if (this.file) {
      this.analysisResult = {
        name: this.file.name,
        score: Math.floor(Math.random() * 50) + 50,
        skills: 'Java, Python, Teamwork'
      };
    }
  }
}
