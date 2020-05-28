import { GameCommand } from './game.command';
import { IPlayer } from '../models/player.model';
import { IGameState } from '../models/game-state.model';
import { CommandValidation } from './command-result';
import { AfterTakeCardsEvent } from '../events/after-take-cards.event';
import { AfterYellUnoEvent } from '../events/after-yell-uno.event';

/**
 * Class that allows a player to yell Uno
 */
export class YellUnoCommand extends GameCommand {
  private readonly yellerId?: string;

  /**
   * Class that allows a player to yell Uno
   *
   * @param yellerId - identifier of the player who wants to yell Uno
   */
  constructor(yellerId?: string) {
    super();

    this.yellerId = yellerId;
  }

  execute(state: IGameState) {
    const yeller = this.yellerId
      ? state.playersGroup.getPlayerById(this.yellerId)
      : (state.turn.player as IPlayer);

    // es posible que el jugador tenga 2 cartas al momento de gritar UNO!
    if (yeller.hand.cards.length <= 2 && !state.unoYellers[yeller.id]) {
      // si no grito antes entonces lo marca como que grito
      state.unoYellers[yeller.id] = true;

      this.events.dispatchAfterYellUno(new AfterYellUnoEvent(yeller));
    } else {
      // si tiene mas de 2 cartas o ya habia gritado
      // entonces debemos validar que no haya mentido

      if (yeller.hand.cards.length > 2) {
        const newCards = state.giveCards(2, yeller);

        this.events.dispatchAfterTakeCards(
          new AfterTakeCardsEvent(newCards, yeller),
        );
      }
    }
  }

  validate(state: IGameState) {
    if (!state.winner){
      return new CommandValidation(false, 'Runox ya terminó');
    }
    
    return new CommandValidation(true);
  }
}
