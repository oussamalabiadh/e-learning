import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asidebar-instructor',
  templateUrl: './asidebar-instructor.component.html',
  styleUrls: ['./asidebar-instructor.component.css']
})
export class AsidebarInstructorComponent implements OnInit {
  
  ngOnInit(): void {
    this.showMenu('nav-toggle', 'navbar', 'body');
  }

  showMenu(toggleId: string, navbarId: string, bodyId: string): void {
    const toggle = document.getElementById(toggleId);
    const navbar = document.getElementById(navbarId);
    const bodypadding = document.getElementById(bodyId);

    if (toggle && navbar && bodypadding) {
        toggle.addEventListener('click', () => {
            // Toggle the menu visibility
            navbar.classList.toggle('show');
            // Rotate the toggle button
            toggle.classList.toggle('rotate');
            // Expand or shrink the body padding
            bodypadding.classList.toggle('expander');
        });
    }

    // Handle link active color change
    const linkColor = document.querySelectorAll<HTMLElement>('.nav__link');
    linkColor.forEach(l => l.addEventListener('click', this.colorLink.bind(this)));
  }

  colorLink(event: Event): void {
    const linkColor = document.querySelectorAll<HTMLElement>('.nav__link');
    linkColor.forEach(l => l.classList.remove('active'));

    const target = event.currentTarget as HTMLElement;
    target.classList.add('active');
  }
}
