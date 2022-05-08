import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { FileUploadService } from '../fileUpload.service';
import { AppToastService } from '../toast.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any [] = []
  searchText: string = ''
  currentEvent = null;
  currentIndex = -1;
  page = 1;
  limit = 10
  count = 0;
  totalPages= 0
  form: FormGroup;
  editMode: boolean = false
  image: any = null
  imageSrc: any = null
  imageBaseUrl = "http://localhost:8000"
  toastService: any
  selectedEvent: any = null

  constructor(
     private eventsService: EventsService,
     private fileUploadService: FileUploadService,
     public formBuilder: FormBuilder, 
     private modalService: NgbModal,
     toastService: AppToastService
    ) {
    this.form = this.formBuilder.group({
      title: ['',  Validators.required],
      subTitle: [''],
      description: [''],
      published: ['']
    })
    this.toastService = toastService
  }

  openModal(content: any, editMode:boolean, event?: any) {
    this.editMode = editMode
    console.log(event);
    
    if(event){
      this.selectedEvent = event
      this.form = this.formBuilder.group({
        title: [event.title],
        subTitle: [event.subTitle],
        description: [event.description],
        published: [event.published]
      })
      if(event.media && event.media.length>0){
        this.imageSrc = this.imageBaseUrl+event.media
        this.image = event.media
      }
    }
    
    this.modalService.open(content, { size: 'lg' });
  }

  ngOnInit(): void {
    this.retrieveEvents();
  }

  getRequestParams(searchTitle: string, page: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    params[`offset`] = (page - 1) * this.limit 

    params[`limit`] = this.limit

    if (searchTitle) {
      params[`search`] = searchTitle;
    }

    return params;
  }

  retrieveEvents(): void {

    const params = this.getRequestParams(this.searchText, this.page);

    this.eventsService.getAll(params)
      .subscribe(
        response => {
          const { docs, totalDocs, totalPages } = response;
          this.events = docs;
          this.count = totalDocs;
          this.totalPages = totalPages
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(e: any): void {
    this.page = e;
    this.retrieveEvents();
  }

  onSubmit(){    
    if(!this.editMode){
      this.addData()
    } else {
      this.updateData(this.selectedEvent)
    }
  }

  onFileSelected(event: any){
    const file:File = event.target.files[0];
    if(file){
      this.fileUploadService.upload(file).subscribe((res) => {
        this.imageSrc = this.imageBaseUrl+res.data.path
        this.image = res.data.path
        console.log(res);  
      }, 
      (err) => {
        console.log(err);  
      })
    }
  }

  closeModal(){
    this.modalService.dismissAll()
    this.form.reset();
  }

  addData() {
    let data = {...this.form.value, media: this.image}

    this.eventsService.create(data).subscribe((res) => {
      console.log(res);  
      this.form.reset()
      this.closeModal()
      this.retrieveEvents()
      this.imageSrc = null
      this.image = null

      this.toastService.show('Operation succeed', 'The event was created successfully', 'success') 
    }, 
    (err) => {
      console.log(err);  
      this.imageSrc = null
      this.image = null
      this.toastService.show('Oups, An error occur', 'Please check your entries and try again', 'error') 
    })
  }

  removeData(id: string) {
    this.eventsService.delete(id).subscribe((res) => {
      console.log(res);  
      this.retrieveEvents()
      this.toastService.show('Operation succeed', 'The event was created successfully', 'success') 
    }, 
    (err) => {
      console.log(err);  
      this.toastService.show('Oups, An error occur', 'Please check your entries and try again', 'error') 
    })
  }

  deleteImage(){
    this.imageSrc = null
    this.image = null
  }

  updateData(event: any){
    let data = {...this.form.value, media: this.image, _id: this.selectedEvent._id}

    this.eventsService.update(data).subscribe((res) => {
      console.log(res);  
      this.form.reset()
      this.closeModal()
      this.retrieveEvents()
      this.imageSrc = null
      this.image = null

      this.toastService.show('Operation succeed', 'The event was created successfully', 'success') 
    }, 
    (err) => {
      console.log(err);  
      this.imageSrc = null
      this.image = null
      this.toastService.show('Oups, An error occur', 'Please check your entries and try again', 'error') 
    })
  }

}


 