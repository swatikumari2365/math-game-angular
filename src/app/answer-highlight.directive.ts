import { Directive,ElementRef } from '@angular/core';
import { NgControl} from '@angular/forms';
import { map,filter } from 'rxjs/operators';

@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(private el:ElementRef,private controlName:NgControl) {
   
   }
  ngOnInit(){
    this.controlName.control?.parent?.valueChanges
    .pipe(map(({a,b,ans})=>Math.abs((a+b-ans)/(a+b))),
      filter(value=>value<0.2)
    )
      .subscribe(value=>{
        if(value<0.2){
          this.el.nativeElement.classList.add('close');
        }
        else{
          this.el.nativeElement.classList.remove('close');
        }
        
      });
  }
}
