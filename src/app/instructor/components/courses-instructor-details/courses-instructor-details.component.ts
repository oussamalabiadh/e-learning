import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ResponseDialogComponent } from 'src/app/shared/components/response-dialog/response-dialog.component';
import { CoursesService } from 'src/app/shared/serices/courses.service';
import { LessonService } from 'src/app/shared/serices/lesson.service';
import { PdfService } from 'src/app/shared/serices/pdf.service';
import { QuizService } from 'src/app/shared/serices/quiz.service';
import { VideoService } from 'src/app/shared/serices/video.service';

@Component({
  selector: 'app-courses-instructor-details',
  templateUrl: './courses-instructor-details.component.html',
  styleUrls: ['./courses-instructor-details.component.css']
})
export class CoursesInstructorDetailsComponent implements OnInit {
  quizId=0
  pdfId=0
  vedioId=0
onUpdateQuiz() {
  if (this.quizForm.valid) {
    const quizData = this.quizForm.value;

    // Supprimer le champ 'questionCount' des données du quiz
    delete quizData.questionCount;
console.log(quizData);

    // Envoyer les données au backend via le service
    this._QuizService.updatequiz(this.quizId, quizData)
      .subscribe({
        next: (response) => {
          console.log('Quiz ajouté avec succès', response)
          this.closeModal("quizUpdateModal")
          this.openDialog(response.status,response.message)
        },
        error: (err) => {
          this.closeModal("quizUpdateModal")
          this.openDialog("failed",err.message)
        }
      });
  } else {
    console.log("Le formulaire est invalide");
  }}
onUpdatePdf() {
throw new Error('Method not implemented.');
}
OnupdateVedio() {
throw new Error('Method not implemented.');
}
updateQuiz(quiz:any){
console.log(quiz);
this.quizId=quiz.id

};
deletePdf(pdf:any){
console.log(pdf);
this.pdfId=pdf.id
};
updatePdf(pdf:any){
  console.log(pdf);
  this.pdfId=pdf.id
};
deleteVedio: any;
deleteQuiz(quiz:any) {
console.log(quiz); this.quizId=quiz.id
}
updateVedio(vedio:any){
  console.log(vedio);
  this.vedioId = vedio.id
    }
  courseId: number | null = null;
  lessons:any[]=[]
  video = {lessonId:0, title: '', description: '' };
  pdf = {lessonId:0, title: '', description: '' };

  selectedFile: File | null = null;
  selectedVideo: any;
  selectedLesson: any;
  selectedPdf: any;
  selectedQuiz: any;

  vedioCount:number=0
  existeVedio=false
  quizForm: FormGroup;
  lessonId=0

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _LessonService: LessonService,
    private _courseService: CoursesService,
    private _VideoService: VideoService,
    private _PdfService: PdfService,
    private fb: FormBuilder,
    private _QuizService:QuizService
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      questionCount: [1, [Validators.required, Validators.min(1)]],
      questions: this.fb.array([]),
    });

    this.setQuestions(1); // Initialiser avec une question par défaut
  }

  getQuestionsControls() {
    return (this.quizForm.get('questions') as FormArray).controls;
  }

  getOptionsControls(i: number) {
    return (this.getQuestionsControls()[i].get('options') as FormArray).controls;
  }

  onQuestionCountChange(): void {
    const count = this.quizForm.get('questionCount')?.value || 0;
    this.setQuestions(count);
  }

  setQuestions(count: number): void {
    const questionsArray = this.quizForm.get('questions') as FormArray;
    questionsArray.clear(); // Efface le FormArray
    for (let i = 0; i < count; i++) {
      questionsArray.push(this.createQuestion());
    }
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
      correctAnswer: ['', Validators.required],
    });
  }

  addQuiz(): void {
    if (this.quizForm.valid) {
      const quizData = this.quizForm.value;
  
      // Supprimer le champ 'questionCount' des données du quiz
      delete quizData.questionCount;
  
      // Envoyer les données au backend via le service
      this._QuizService.addQuiz(this.lessonId, quizData)
        .subscribe({
          next: (response) => {
            console.log('Quiz ajouté avec succès', response)
            this.closeModal("quizModal")
            this.openDialog(response.status,response.message)
          },
          error: (err) => {
            this.closeModal("quizModal")
            this.openDialog("failed",err.message)
          }
        });
    } else {
      console.log("Le formulaire est invalide");
    }
  }
  

  selectedTab: string = 'Course';

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  onPdfSelect(pdf: any, lesson: any) {
    this.selectedPdf = pdf;
    this.selectedLesson = lesson;
    this.existeVedio = false;  // Pour s'assurer que la vidéo est masquée
  }
  onQuizSelect(quiz: any,lesson:any) {
    this.selectedQuiz = quiz;
    this.selectedLesson = lesson;
    this.existeVedio = false;  // Pour s'assurer que la vidéo est masquée
  }
  ngOnInit(): void {
    const courseIdParam = this.route.snapshot.paramMap.get('id');
    this.courseId = courseIdParam ? +courseIdParam : null;  // Convert the courseId to a number
    console.log(this.courseId);
    this.loadLesson()
  }

  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId) as HTMLElement;
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.hide();
      document.querySelector('.modal-backdrop')?.remove();
    } else {
      console.error(`Modal with ID '${modalId}' not found.`);
    }
  }

  openDialog(state: string, message: string) {
    this.dialog.open(ResponseDialogComponent, {
      data: { state, message },
      width: '600px'
    });
  }

  onAClick(event: MouseEvent) {
    event.stopPropagation();
    console.log('Bouton Add cliqué!');
    console.log(event);
    
  }

  onAddClick(event: MouseEvent) {
    // Handle main add click if needed
  }

  onAddVideoClick(id: any) {
    console.log(id);
    // Save the lesson id to use when submitting the video
    this.video['lessonId'] = id;
  }
  onSubmit() {
    if (this.selectedFile && this.video.title && this.video.description && this.video['lessonId']) {
        const formData = new FormData();
        formData.append('videoFile', this.selectedFile);
        
        // Serialize video object to JSON
        const videoJson = JSON.stringify({
            title: this.video.title,
            description: this.video.description,
        });
        
        formData.append('video', videoJson); // append the serialized JSON to the formData

        this._VideoService.addVideo(this.video['lessonId'], formData).subscribe({
            next: (value) => {
                console.log(value);
                this.closeModal('videoModal');
                this.openDialog(value.status, value.message);
                this.loadLesson()
            },
            error: (err) => {
                console.log(err);
                this.closeModal('videoModal');
                this.openDialog("failed", err.message);
            }
        });
    } else {
        console.error('Missing file, title, description, or lesson ID.');
    }
}

onSubmitPdf() {
  if (this.selectedFile && this.pdf.title && this.pdf.description && this.pdf['lessonId']) {
      const formData = new FormData();
      formData.append('pdfFile', this.selectedFile);
      
      // Serialize pdf object to JSON
      const pdfJson = JSON.stringify({
          title: this.pdf.title,
          description: this.pdf.description,
      });
      
      formData.append('pdf', pdfJson); // append the serialized JSON to the formData

      this._PdfService.addPdf(this.pdf['lessonId'], formData).subscribe({
          next: (value) => {
              console.log(value);
              this.closeModal('pdfModal');
              this.openDialog(value.status, value.message);
              this.loadLesson()
          },
          error: (err) => {
              console.log(err);
              this.closeModal('pdfModal');
              this.openDialog("failed", err.message);
          }
      });
  } else {
      console.error('Missing file, title, description, or lesson ID.');
  }
}
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onAddQuizClick(id:any) {
    console.log(id);
    this.lessonId=id
    
    // Handle add quiz
  }

  onAddPdfClick(id:any) {
    console.log(id);
    // Save the lesson id to use when submitting the video
    this.pdf['lessonId'] = id;  }

  onUpdateClick(lesson:any) {
console.log(lesson);
this.lessonId=lesson.id
  }

  onDeleteClick(lesson:any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{  data: { message: "Vouz voulez supprimer ce lesson "+lesson.title+"?" }});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._LessonService.deleteLesson(lesson.id).subscribe(
        {
          next:(response)=> {
            console.log(response);
            
  this.openDialog(response.state , response.message)
  this.loadLesson()
          },
          error:(error) => {
            console.log(error);
            
            this.openDialog("failed", error.message);
  
          }
        }
        );
      }
    });
  }

  saveLesson() {
    const titleElement = document.getElementById('lessonTitle') as HTMLInputElement;
    const descriptionElement = document.getElementById('lessonDescription') as HTMLTextAreaElement;

    const form = {
      title: titleElement?.value,
      description: descriptionElement?.value
    };

    if (this.courseId !== null) {
      this._LessonService.addLesson(this.courseId, form).subscribe({
        next: (value) => {
          console.log(value);
          this.closeModal('ajouterLesson')
          this.openDialog(value.status, value.message)      
          this.loadLesson()         
    
        },
        error: (err) => {
          console.log(err);
          this.closeModal('ajouterLesson')
          this.openDialog("failed", err.message)
        }
      });
    } else {
      console.error('Course ID is null.');
    }
  }
  updateLesson() {
    const titleElement = document.getElementById('lessonTitleupdate') as HTMLInputElement;
    const descriptionElement = document.getElementById('lessonDescriptionupdate') as HTMLTextAreaElement;

    const form = {
      title: titleElement?.value,
      description: descriptionElement?.value
    };
    console.log("x",form);
    console.log("y",this.lessonId);
    
    

    if (this.courseId !== null) {
      this._LessonService.updateLesson(this.lessonId, form).subscribe({
        next: (value) => {
          console.log(value);
          this.closeModal('updateLesson')
          this.openDialog(value.status, value.message) 
          this.loadLesson()         
        },
        error: (err) => {
          console.log(err);
          this.closeModal('updateLesson')
          this.openDialog("failed", err.message)
        }
      });
    } else {
      console.error('Course ID is null.');
    }
  }
  loadLesson(){
    if (this.courseId) {
      this._courseService.getCourseById(this.courseId).subscribe({
        next:(value)=> {
          console.log(value);
          this.lessons=value.data.lessons
          console.log(this.lessons);
          if (this.lessons.length) {
            // Select the first lesson and its first video by default
            this.selectedLesson = this.lessons[0];
            if (this.selectedLesson.videos.length) {
              this.selectedVideo = this.selectedLesson.videos[0];
            }
          }
          
        },
        error:(err)=> {
          console.log(err);
          
        },
      })

      
    }
  }


  
  onLessonSelect(lesson: any) {
    this.selectedLesson = lesson;
  
    // Automatically select the first video of the lesson
    if (lesson.videos.length) {
      this.selectedVideo = lesson.videos[0];
      this.existeVedio = true;  // Set to true when videos exist
    } else {
      this.selectedVideo = null;
      this.existeVedio = false;  // Set to false when no videos exist
    }
  }
  
  onVideoSelect(video: any, lesson: any) {
    console.log(video);
    this.vedioCount = 1;  // Update if needed for additional logic
    this.selectedLesson = lesson;
    this.selectedVideo = video;
    this.existeVedio = true;  // Ensure video existence is updated when selecting a specific video
  }
 
}