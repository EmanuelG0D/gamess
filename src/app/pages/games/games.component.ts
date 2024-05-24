import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoryInterface, ProductoInterface } from '../../interface/producto-interface';
import { ProductoService } from '../../services/http/producto.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, FormsModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent implements OnInit {

  games: ProductoInterface[] = [];
  categories: CategoryInterface  [] = [];
  searchInput: string = '';

  public gamesService = inject(ProductoService);
  public route = inject(Router);

  
  search(){
    this.gamesService.getsearch(this.searchInput).subscribe((rest: ProductoInterface[]) => {
      this.games = rest;
    });
  }

  listCategory() {
    this.gamesService.getAllCategory().subscribe((rest: CategoryInterface[]) => {
      this.categories = rest;
    });
  }

  ngOnInit(): void {
    this.listGames();
    this.listCategory();
  }

  listGames() {
    this.gamesService.getAllGames().subscribe((rest: ProductoInterface[]) => {
      this.games = rest;
    });
  }

  salir(){
    localStorage.removeItem("token");
    this.route.navigateByUrl("/login");
  }

  deleteGames(id:number){
    this.gamesService.deleteGames(id).subscribe(
      (rest: boolean) => {
        console.log("Eliminado correctamente");
        this.games = this.games.filter(games => games.id !== id);
      }
    )
  }

  nameGamesNew : string = '';
  priceGamesNew : number = 0.0;
  descriptionGamesNew: string='';
  categoryGamesNew: number=0.0;
  photoGamesNew: string='';


  addProduct(){
  this.gamesService.postProductGames(
    this.nameGamesNew,
    this.priceGamesNew,
    this.descriptionGamesNew,
    this.categoryGamesNew,
    [this.photoGamesNew]
  ).subscribe({
    next  : (response) =>{
      this.games.push(response);
    }
  });


  }
}
