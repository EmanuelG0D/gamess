import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    this._http.login(this.username,this.password).subscribe((res : any) =>{
      console.log(res);
      localStorage.setItem("token", res["access_token"]);
      this.route.navigateByUrl("/admin");
    })
  }


}
