import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Global } from './global.service'
import { Project } from '../models/project'

@Injectable()
export class ProjectService{
    public url:string
    constructor(private _http:HttpClient){
        this.url = Global.url
    }
    makeFileRequest(url:string,params:any,files:Array<File>,name:string){
        return new Promise((resolve,reject) => {
            var formData:any = new FormData()
            var xhr:any = new XMLHttpRequest()
            //Añadimos los archivos al form
            let file = files[0]
            formData.append(name,file,file.name)
            //Hacemos validaciones para la peticion
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response)
                    }
                }
            }
            //Hacemos la peticion
            xhr.open('POST',url,true)
            xhr.send(formData)
        })
    }
    getProjects():Observable<any>{
        let headers = new HttpHeaders().set("Content-Type","application/json")
        return this._http.get(this.url + "project",{headers:headers})
    }
    getProject(id:string):Observable<any>{
        let headers = new HttpHeaders().set("Content-Type","application/json")
        return this._http.get(this.url + `project/${id}`,{headers:headers}) 
    }
    saveProject(project:Project):Observable<any>{
        let params = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type','application/json')
        return this._http.post(this.url + "save",params,{headers:headers})
    }
    deleteProject(id:string):Observable<any>{
        let headers = new HttpHeaders().set("Content-Type","application/json")
        return this._http.delete(this.url + `project/${id}/delete`,{headers:headers}) 
    }
    updateProject(project:any):Observable<any>{
        let json = JSON.stringify(project)
        let headers = new HttpHeaders().set("Content-Type","application/json")
        return this._http.put(this.url + `project/${project._id}/update`,json,{headers:headers}) 
    }
}