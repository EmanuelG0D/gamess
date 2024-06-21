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
  categories: CategoryInterface[] = [];
  searchInput: string = '';

  public gamesService = inject(ProductoService);
  public route = inject(Router);


  search() {
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

  salir() {
    localStorage.removeItem("token");
    this.route.navigateByUrl("/login");
  }

  deleteGames(id: number) {
    //sweet alert seguro de borrar?
    this.gamesService.deleteGames(id).subscribe(
      (rest: boolean) => {
        alert("Eliminado correctamente");
        this.games = this.games.filter(games => games.id !== id);
      }
    )
  }

  nameGamesNew: string = '';
  priceGamesNew: string = '';
  descriptionGamesNew: string = '';
  categoryGamesNew: number = 5;
  photoGamesNew: string = '';

  addProduct() {


    const regexlink = /^(ftp|http|https):\/\/[^ "]+$/;
    const regex = /^-?[0-9]+$/;

    if (this.nameGamesNew === "") {
      alert("El nombre del juego es requerido");

    } else if (this.priceGamesNew === "") {
      alert("El precio es requerido")

    } else if (!regex.test(this.priceGamesNew)) {
      alert("El precio no puede contener texto");

    } else if (this.descriptionGamesNew === "") {
      alert("La descripcion es necesaria")

    } else if (this.photoGamesNew === "") {
      alert("Agregue fotografía")

    } else if (!regexlink.test(this.photoGamesNew)) {
      alert("Formato de link incorrecto");

    }


    this.gamesService.postProductGames(
      this.nameGamesNew,
      Number(this.priceGamesNew),
      this.descriptionGamesNew,
      this.categoryGamesNew,
      [this.photoGamesNew]
    ).subscribe({
      next: (response) => {
        this.games.push(response);
        alert("Se agrego el juego");
        this.nameGamesNew = '';
        this.priceGamesNew = '';
        this.descriptionGamesNew = '';
        this.categoryGamesNew = 5;
        this.photoGamesNew = '';
      }

    });

  }

  id: number = 0;
  nameGamesUp: string = 'a';
  priceGamesUp: string = '';
  descriptionGamesUp: string = 'a';
  photoGamesUp: string = 'a';

  shUpdateG(id: number){
    this.gamesService.getById(id).subscribe(
      (rest: ProductoInterface) => {
        this.nameGamesUp = rest.title;
        this.priceGamesUp = rest.price + '';
        this.descriptionGamesUp = rest.description;
        this.photoGamesUp = rest.title;
    });
  }
}
