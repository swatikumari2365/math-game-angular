import { Component,OnInit } from '@angular/core';
import { FormGroup,FormControl} from '@angular/forms';
import { delay,filter,scan } from 'rxjs/operators'
import { Customvalidator } from '../customvalidator';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secpersoln=0;
  mathForm=new FormGroup(
    {
      a:new FormControl(this.randomNumber()),
      b:new FormControl(this.randomNumber()),
      ans:new FormControl('')
    },
    [
      Customvalidator.addition('ans','a','b'),
    ]
  );


  constructor(){}

  get a(){
    return this.mathForm.value.a;
  }

  get b(){
    return this.mathForm.value.b;
  }



  ngOnInit(): void {


    this.mathForm.statusChanges.pipe(
      filter(value=>value==='VALID'),
      delay(100),
      scan((acc)=>{
        return{
          numberSolved:acc.numberSolved+1,
          startTime:acc.startTime
        }           
      },{numberSolved:0,startTime:new Date() })
      )
      .subscribe(({ numberSolved , startTime})=>{
        numberSolved++;
        this.secpersoln=(
          new Date().getTime()-startTime.getTime()
        )/numberSolved/1000;
      this.mathForm.setValue({
        a:this.randomNumber(),
        b:this.randomNumber(),
        ans:''
      });
    });
  }

  randomNumber(){
    return Math.floor(Math.random()*10);
  }

}
