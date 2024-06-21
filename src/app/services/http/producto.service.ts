import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environment.development';
import {Observable} from 'rxjs'; 
import { CategoryInterface, ProductoInterface } from '../../interface/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly _http = inject(HttpClient);

  constructor() {}

  login(email: string, password: string) {
    return this._http.post<ProductoInterface[]>(
      'https://api.escuelajs.co/api/v1/auth/login',
      { email: email, password: password } 
    );
  }

  getAllGames():Observable<ProductoInterface[]>{
    return this._http.get<ProductoInterface[]>(
      'https://api.escuelajs.co/api/v1/products',{}
    );
  }


  getAllCategory():Observable<CategoryInterface[]>{
    return this._http.get<CategoryInterface[]>(
      'https://api.escuelajs.co/api/v1/categories',{}
    );
  }


  getsearch(name:string):Observable<ProductoInterface[]>{
    console.log(name);
    return this._http.get<ProductoInterface[]>(
      `https://api.escuelajs.co/api/v1/products/?title=${name}`,{}
    );
  }



  postProductGames(
    title:string,
    price:number,
    description:string,
    category:number,
    images:string[]
  ):Observable<ProductoInterface>{
    return this._http.post<ProductoInterface>(
      'https://api.escuelajs.co/api/v1/products/',{
        "title":title,
        "price":price,
        "description":description,
        "categoryId": category,
        images:images
      }
    )
  }



  putGames(id: number, 
    title:string,
    price:number,
    description:string,
    category:number,
    images:string[]
  ):Observable<ProductoInterface>{
    return this._http.put<ProductoInterface>(
      `https://api.escuelajs.co/api/v1/products/${id}`,{
        "title":title,
        "price":price,
        "description":description,
        "categoryId": category,
        images:images
      }
    )
  }


  deleteGames(id:number):Observable<boolean>{
    return this._http.delete<boolean>(
      `https://api.escuelajs.co/api/v1/products/${id}`,{}
    )
  }


  getById(id:number):Observable<ProductoInterface>{
    return this._http.get<ProductoInterface>(
      `https://api.escuelajs.co/api/v1/products/${id}`,{}
    )
  }



  

}
