import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';
import { QuoteRequestService } from '../quote-http/quote-request.service';



@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  goals:Goal[];
  alertService:AlertService;
  quote!:Quote;

  constructor(goalService:GoalService, alertService:AlertService, private quoteService:QuoteRequestService) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }

  deleteGoal(isComplete:any, index:number){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe(`The goal ~ ${this.goals[index].name} ~ has been deleted`)
      }
    }
  }

  toggleDetails(index:number){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  addNewGoal(goal: Goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate);
    this.goals.push(goal);
  }

  ngOnInit(){
    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
    }

    // this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.u/random.json").subscribe(data=>{
    //   // Succesful API request
    //   this.quote = new Quote(data.author, data.quote)
    // }, err => {
    //   this.quote = new Quote("Harrison Kaudia", "When all things fall in place, You realize all the tiny details now really matter !")
    // })
}


