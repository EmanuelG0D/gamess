import { Component, inject } from '@angular/core';
import { EmailValidator, FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/http/producto.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  username : string = '';
  password : string = '';

  private readonly _http = inject(ProductoService);
  public route = inject(Router);

  cambiar(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if(this.username === ""){
      alert("El email es requerido");
    }else if (this.password === "") {
      alert("La contraseña es requerida");
    } else if(!regex.test(this.username)) {
      alert("El formato del correo no es valido");
    }
     
   
    this._http.login(this.username,this.password).subscribe((res : any) =>{
      if(res["success"] === true){

      }else{
        
      }
      localStorage.setItem("token", res["access_token"]);
      this.route.navigateByUrl("/admin");
    })
  }


}
