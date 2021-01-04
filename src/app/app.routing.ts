import { ModuleWithProviders } from '@angular/core'
import { Routes , RouterModule } from '@angular/router'

import { AboutComponent } from './components/about/about.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component'
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detalles/detalles.component'
import { EditComponent } from './components/edit/edit.component'
const appRoutes:Routes = [
    {path:'',component:AboutComponent},
    {path:'sobre-mi',component:AboutComponent},
    {path:'contacto',component:ContactComponent},
    {path:'proyectos',component:ProjectsComponent},
    {path:'crear',component:CreateComponent},
    {path:'proyectos/:id',component:DetailComponent},
    {path:'proyectos/:id/editar',component:EditComponent},
    {path:'**',component:ErrorComponent}
]
export const appRoutingProviders:Array<any> =  []
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)