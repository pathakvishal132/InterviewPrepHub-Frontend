import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-development',
  templateUrl: './web-development.component.html',
  styleUrl: './web-development.component.css'
})
export class WebDevelopmentComponent {
  dsaTopics = [
    'Arrays', 'LinkedList', 'Stack', 'Queue', 'Hashing', 
    'Trees', 'Binary Search Tree', 'AVL Tree', 'Heap', 
    'Graph', 'Recursion', 'Dynamic Programming', 
    'Sorting', 'Searching', 'Bit Manipulation', 
    'String', 'Matrix', 'Greedy', 'Backtracking'
  ];

  systemDesignTopics = [
    'Scalability', 'Load Balancing', 'Caching', 'Database Sharding',
    'Microservices', 'API Design', 'Consistent Hashing', 'CAP Theorem',
    'Message Queues', 'CDN', 'System Design Patterns', 'Distributed Systems'
  ];

  javaTopics = [
    'Core Java', 'OOPs', 'Collections', 'Multithreading', 'Exception Handling',
    'Generics', 'JDBC', 'JVM Internals', 'Design Patterns', 'Spring Boot',
    'Hibernate', 'REST APIs', 'Microservices', 'Maven/Gradle'
  ];

  pythonTopics = [
    'Python Basics', 'Data Types', 'Functions', 'OOP', 'Decorators',
    'Generators', 'File Handling', 'NumPy', 'Pandas', 'Django',
    'Flask', 'REST APIs', 'SQL', 'Data Visualization'
  ];

  expandedDSA = false;
  expandedSystemDesign = false;
  expandedJava = false;
  expandedPython = false;

  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    this.location.back();
  }

  toggleDSA() {
    this.expandedDSA = !this.expandedDSA;
  }

  toggleSystemDesign() {
    this.expandedSystemDesign = !this.expandedSystemDesign;
  }

  toggleJava() {
    this.expandedJava = !this.expandedJava;
  }

  togglePython() {
    this.expandedPython = !this.expandedPython;
  }

  navigateToDSATopic(topic: string) {
    this.router.navigate(['/questions'], { queryParams: { domain: 'Web Development', subdomain: 'DSA ' + topic } });
  }

  navigateToSystemDesignTopic(topic: string) {
    this.router.navigate(['/questions'], { queryParams: { domain: 'Web Development', subdomain: 'System Design ' + topic } });
  }

  navigateToJavaTopic(topic: string) {
    this.router.navigate(['/questions'], { queryParams: { domain: 'Web Development', subdomain: 'Java ' + topic } });
  }

  navigateToPythonTopic(topic: string) {
    this.router.navigate(['/questions'], { queryParams: { domain: 'Web Development', subdomain: 'Python ' + topic } });
  }
}
