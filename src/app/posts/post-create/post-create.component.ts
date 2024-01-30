import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private postId:string=''
 post:any={}
 isLoading = false;
 form !:FormGroup;
 imagepreview!:string

  constructor(public postsService: PostsService, public route:ActivatedRoute) {}
ngOnInit(){
  // this.route.paramMap.subscribe((paramMap:any)=>{
  //   if(paramMap.has('postId')){
  //     this.mode='edit';
  //     this.postId=paramMap.get('postId')
  //   }else{
  //     this.mode='create'
  //   }
  // })//old method
this.form=new FormGroup({
  title:new FormControl("",[Validators.required,Validators.minLength(3)],),
  content:new FormControl("",[Validators.required]),
  // image:new FormControl("",[Validators.required, mimeType]), 
})
  this.postId=this.route.snapshot.paramMap.get('postId')?? 'new'
  if(this.postId!='new'){
    this.mode='edit'
    this.isLoading = true;
    let post=this.postsService.getPost(this.postId).subscribe((postData:any)=>{
      this.isLoading = false;
      this.post={id:postData._id,title:postData.title, content:postData.content}
      this.form.setValue({
        title: this.post.title,
        content: this.post.content
      });
    });
    this.post={...post};
    
  }else{
    this.mode='create'
  }
}


onImagePicked(event:any){
  const file = event.target.files[0];
  this.form.patchValue({image:file});
  this.form.get('image')?.updateValueAndValidity
  const reader = new FileReader();
  reader.onload = () =>{
    this.imagepreview=reader.result as string
  }
  reader.readAsDataURL(file);
  }

onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode==='create'){
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    }else{
      this.postsService.updatePost(this.postId,this.form.value.title, this.form.value.content)
    }
  
    this.form.reset();
  }
}
