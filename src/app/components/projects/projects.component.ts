import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service'
import { Global } from '../../services/global.service'
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public url:string
  public projects:any
  constructor(private _projectService:ProjectService) {
    this.url = Global.url
  }
  getProjects(){
    this._projectService.getProjects().subscribe(
    (result) => {
      if(result['got']){
        this.projects = result['got']
      }
    },
    (err) => {
      console.log(<any>err)
    }
    )
  }
  deleteProject(id:string){
    this._projectService.deleteProject(id).subscribe(
      (result) => {
          console.log("deleted: " + result['deleted']._id)
      },
      (err) => {
        console.log(<any>err)
      }
    )
    this.getProjects()
  }
  ngOnInit(): void {
    this.getProjects()
  }

}
