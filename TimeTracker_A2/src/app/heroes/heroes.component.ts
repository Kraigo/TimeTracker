import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero, HeroService } from './shared';

@Component({
  selector: 'toh-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})



export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];
  
  constructor(    
    private router: Router,
    private heroService: HeroService
  ) { }
  
  ngOnInit(): void {
    this.getHeroes();
  }
  
  getHeroes(): void {
    this.heroService.getHeroes()
      .then( heroes => this.heroes = heroes );
  }

  onSelect(hero: Hero): void {
      this.selectedHero = hero;
  }

  gotoDetail(hero: Hero): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}


