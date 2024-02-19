import { AbstractControl } from '@angular/forms';

export class Customvalidator {
    static addition(target:string,sourceOne:string,sourceTwo:string){
        return(form:AbstractControl)=>{
            const sum=form.value[target];
            const firstNumber=form.value[sourceOne];
            const secondNumber=form.value[sourceTwo];
            const {a,b,ans}=form.value;
        if ( firstNumber + secondNumber === parseInt(sum)){
          return null;
        }
        return { addition:true};
        }
        
    }

    
}



