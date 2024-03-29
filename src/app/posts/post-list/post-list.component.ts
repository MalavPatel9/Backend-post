import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
import { PostsService } from "../posts.service";
import { Post } from "../posts.model";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub!: Subscription;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true
     this.postsService.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: {posts:Post[], postCount:number}) => {
        this.isLoading = false
        this.totalPosts = postData.postCount
        this.posts = postData.posts;
      });
  }

  

  onChangedPage(pageData:PageEvent){
    this.isLoading = true
    this.currentPage = pageData.pageIndex+1;
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }
  
  onDelete(postId:string){
    this.isLoading = true
  this.postsService.deletePost(postId).subscribe(()=>{
  this.postsService.getPosts(this.postsPerPage,this.currentPage)
  })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

