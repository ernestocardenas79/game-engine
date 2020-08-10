
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILog } from './log/log.factory';
import { LogLevel } from './log/log-levels.enum';

export class GameEngine {

  private PLAYERS_PER_2DECKS = 6;
  private deckQuantity=2;
  private players:string[]= [];
  /*
    Una vez construido el juego se escuchara los jugadores que se registren para que dependiendo de la 
    cantidad sera el numero de mazos a utilizar en el juego, se tendra una proporcion de 6 jugadores por 2 mazos
  */
  constructor() {
    console.log('Is watching');
    // TODO Crear mazo de cartas

  }

  addPlayer(info: string){
    this.players.push(info);
    this.calculteDecks();
    console.log(this.deckQuantity, this.players);
  }

  private calculteDecks(){
    const quantity =this.players.length/this.PLAYERS_PER_2DECKS;
    const isMultiple =this.players.length%this.PLAYERS_PER_2DECKS;
    if(isMultiple ==0){
        this.deckQuantity = quantity*2;
    }
  }

  startGame(){
    console.log('this is the show');
  }

}
