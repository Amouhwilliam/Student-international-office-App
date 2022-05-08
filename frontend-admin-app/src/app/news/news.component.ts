import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { FileUploadService } from '../fileUpload.service';
import { AppToastService } from '../toast.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: any [] = []
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
  selectedNews: any = null

  constructor(
     private newsService: NewsService,
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

  openModal(content: any, editMode:boolean, news?: any) {
    this.editMode = editMode
    console.log(news);
    
    if(news){
      this.selectedNews = news
      this.form = this.formBuilder.group({
        title: [news.title],
        subTitle: [news.subTitle],
        description: [news.description],
        published: [news.published]
      })
      if(news.media && news.media.length>0){
        this.imageSrc = this.imageBaseUrl + news.media
        this.image = news.media
      }
    }
    
    this.modalService.open(content, { size: 'lg' });
  }

  ngOnInit(): void {
    this.retrieveNews();
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

  retrieveNews(): void {

    const params = this.getRequestParams(this.searchText, this.page);

    this.newsService.getAll(params)
      .subscribe(
        response => {
          const { docs, totalDocs, totalPages } = response;
          this.news = docs;
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
    this.retrieveNews();
  }

  onSubmit(){    
    if(!this.editMode){
      this.addData()
    } else {
      this.updateData(this.selectedNews)
    }
  }

  onFileSelected(news: any){
    const file:File = news.target.files[0];
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
    this.deleteImage()
  }

  addData() {
    let data = {...this.form.value, media: this.image}

    this.newsService.create(data).subscribe((res) => {
      console.log(res);  
      this.form.reset()
      this.closeModal()
      this.retrieveNews()
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
    this.newsService.delete(id).subscribe((res) => {
      console.log(res);  
      this.retrieveNews()
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

  updateData(news: any){
    let data = {...this.form.value, media: this.image, _id: this.selectedNews._id}

    this.newsService.update(data).subscribe((res) => {
      console.log(res);  
      this.form.reset()
      this.closeModal()
      this.retrieveNews()
      this.imageSrc = null
      this.image = null

      this.toastService.show('Operation succeed', 'The event was created successfully', 'success') 
    }, 
    (err: any) => {
      console.log(err);  
      this.imageSrc = null
      this.image = null
      this.toastService.show('Oups, An error occur', 'Please check your entries and try again', 'error') 
    })
  }

}


 