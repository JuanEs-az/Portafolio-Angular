import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service'
import { Global } from '../../services/global.service'
import { Project } from '../../models/project'
import { Router , ActivatedRoute , Params } from '@angular/router'
//import {} from ''
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService]
})
export class EditComponent implements OnInit {
  public url:string
  public title:string
  public project:any
  public sent:string
  public filesToUpload:Array<File> = []
  public id:string
  public filename:string
  constructor(private _projectService:ProjectService,private _route:ActivatedRoute,private _router:Router) {
    this.url = Global.url
    this.title = "Actualiza tu proyecto"
    this._route.params.subscribe((params:Params) => {
      this.id = params.id
    })
  }

  ngOnInit(): void {
    this.getProject(this.id)
  }
  changeFile(event:any){
    this.filesToUpload = <Array<File>>event.target.files
    console.log(this.filesToUpload)
  }
  getProject(id:string){
    this._projectService.getProject(id).subscribe(
    (result) => {
      this.project = result['got']
    },
    (err) => {
      console.log(<any>err)
    }
  )
  }
  onSubmit(form:any){
    this._projectService.updateProject(this.project).subscribe(
      (result) => {
        this.sent = "true"
        //Subir imagen
        if(this.filesToUpload.length > 0){
          this._projectService.makeFileRequest(this.url + `project/${result.now._id}/uploadImage`,[],this.filesToUpload,'image')
          .then((response:any) => {
            form.reset()
          })
          .catch((err) => {
            console.log(<any>err)
          }) 
          this._router.navigate(['proyectos'])
        }else{
          this._router.navigate(['proyectos'])
        }
        //Fin de subir imagen
      },
      (err) => {
        this.sent = "false"
      })
  }

}
