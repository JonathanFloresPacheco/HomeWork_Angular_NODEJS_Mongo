import { Component, OnInit } from '@angular/core';
import {teachers} from '../models/teachers';
import {matery} from '../models/matery';
import {listjobs} from '../models/listjobs';
import {GeneralService} from '../services/generalService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title:string = 'Homework';
  description:string;
  matery_id:string;
  teacher_id:string;
  message ='Welcome';
  selected = 'option2';
  isSubmittingForm: Boolean = false;

  _teachers: teachers[] = [];
  _matery: matery[] = [];
  _listjobs: any[] = [];
  model:any = {};
  model2:any = {};

  constructor(
    private generalService: GeneralService) {
      
    this.getmatery();
    this.gethomework();
     }

  ngOnInit(): void {
  }


  getmatery():void{
    this.generalService.getmatery().subscribe((result:matery[])=>{
      this._matery = result;
    });
  }

  filterSearchTeachers(value){
    console.log(value);
    this.generalService.filterSearchTeachers(value).subscribe((result:teachers[])=>{
      this._teachers = result;
    });
  }

  submitForm(value){
    console.log(value);
    const _listjobsSend = new listjobs;
    _listjobsSend.description = this.description;
    _listjobsSend.matery = this.matery_id;
    _listjobsSend.teacher = this.teacher_id;

    this.generalService.homeworkRegistration(_listjobsSend).subscribe((result:any)=>{
      if(result){
        this.message="Your homework has been successfully posted";
        this.gethomework();
        this.cleanValues();
      }
    });
  }

  
  cleanValues():void{
    this.description='';
    this.matery_id='';
    this.teacher_id='';
  }


  gethomework():void{
    this.generalService.gethomework().subscribe((result:any[])=>{
      this._listjobs=result;
      console.log(this._listjobs);
    });
  }


  deleteHomework(value):void {
    console.log(value); 
    var answer = confirm('Are you sure?');
    if(answer) {
      this.generalService.deletehomework(value).subscribe((result:any)=>{
        if(result){
          this.gethomework();
          this.message = 'Your homework has been deleted"';
        }
      });
    }
  }

  editHomework(i):void {
    console.log(i);
  }


  updateEmployee():void {
  }

  closeAlert():void {
    // this.msg = '';
  }

}