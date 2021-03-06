import { Component, OnInit } from '@angular/core';
import { info } from 'console';
import { element } from 'protractor';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers:[Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game:Gamelogic) { }

  ngOnInit(): void {
  }
  startGame():void{
    this.game.gameStart();
    const currentPlayer='Now turn Player ' + this.game.currentTurn;
    const info=document.querySelector('.current-status');
    info!.innerHTML=currentPlayer;
  }

  async clickSubfield(subfield:any):Promise<void>{
    if(this.game.gameStatus===1){
      const position=subfield.currentTarget.getAttribute('position');

      this.game.setField(position, this.game.currentTurn);
      const color=this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      await this.game.checkGameEndWinner().then((end:boolean)=>{
        if(this.game.gameStatus===0 && end){
          const info=document.querySelector('.current-status');
          info!.innerHTML='Winner is Player'+this.game.currentTurn;
        }
      });
      await this.game.checkGameEndFull().then((end:boolean)=>{
        if(this.game.gameStatus===0 && end){
          const info=document.querySelector('.current-status');
          info!.innerHTML='No Winner';
        }
      });

      this.game.changePlayer();

      if(this.game.gameStatus===1){
        const currentPlayer='Now turn Player ' + this.game.currentTurn;
        const info=document.querySelector('.current-status');
        info!.innerHTML=currentPlayer;
      }
    }

  }
}
