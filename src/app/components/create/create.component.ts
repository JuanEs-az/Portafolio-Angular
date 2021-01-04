import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'
import { ProjectService } from '../../services/project.service'
import { Global } from '../../services/global.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[ProjectService]
})
export class CreateComponent implements OnInit {
  public title:string
  public project:Project
  public sent:string
  public idSaved:string
  public filesToUpload:Array<File> = []

  constructor(
    private _projectService:ProjectService
  ){
    this.title = "Crea tu proyecto"
    this.project = new Project("","","",new Date().getFullYear(),"","")
  }

  changeFile(event:any){
    this.filesToUpload = <Array<File>>event.target.files
    console.log(this.filesToUpload)
  }
  onSubmit(form:any): void{
    //Guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      (result) => {
        if(result.submitted){
          this.sent = 'true'
          this.idSaved = result.submitted._id
          //Subir la imagen
          if(this.filesToUpload.length > 0){
            this._projectService.makeFileRequest(Global.url + `project/${result.submitted._id}/uploadImage`,[],this.filesToUpload,'image')
              .then((response:any) => {
                form.reset()
              })
              .catch((err) => {
                console.log(<any>err)
                this.sent = 'false'
              })
            }else{
              form.reset()
            }
          //Fin de subir imagen
        }else{
          this.sent = 'false'
          form.reset()
        }
      },
      (err) => {
        console.log(err)
        
      }
    )
  }
  
  ngOnInit(): void {
  }

}
