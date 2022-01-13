import { users } from "../data/users.js";
import DataError from "../models/dataError.js";

export default class  UserService{
    constructor(loggerService){
        this.employees=[];
        this.costumers=[];
        this.loggerService = loggerService;
        this.errors= [];
    }

load(){
  for (const user of users) {
      switch(user.type){
          case "costumer" :
             if(!this.checkCustomerValidityForErrors(user)){
          this.costumers.push(user);
           } 
          break;
          case "employee" : 
          if(!this.checkEmployeeValidityForErrors(user)){
          this.employees.push(user);
           }
          break;
          default: 
            this.errors.push(new DataError("Wrong user type", user));
              break;
      }
  }
}

checkCustomerValidityForErrors(user){
    let reqiredFields = "id firstName lastName age city".split(" ");
    let hasErrors =false;
    for (const field of reqiredFields) {
        if(!user[field]){
            hasErrors = true;
            this.errors.push(new DataError(`Validation Problem. ${field} is required` , user));
        }
    }

    if(Number.isNaN(Number.parseInt(user.age))){
        hasErrors=true;
        this.errors.push(new DataError(`Validation Problem. ${user.age}  is not a number` , user));
    }

    return hasErrors;
}
checkEmployeeValidityForErrors(user){
    let reqiredFields = "id firstName lastName age city salary".split(" ");
    let hasErrors =false;
    for (const field of reqiredFields) {
        if(!user[field]){
            hasErrors = true;
            this.errors.push(new DataError(`Validation Problem. ${field} is required` , user));
        }
    }
    if(Number.isNaN(Number.parseInt(+user.age))){
        hasErrors=true;
        this.errors.push(new DataError(`Validation Problem. ${user.age}  is not an age` , user));
    }
    return hasErrors;
}


add (user){
   switch (user.type) {
       case "customer":
        if(!this.checkCustomerValidityForErrors(user)){
            this.costumers.push(user);
             } 
           break;
        case "employee":
            if(!this.checkEmployeeValidityForErrors(user)){
                this.employees.push(user);
                 }
           break;
   
       default:
        this.errors.push(new DataError("This user can not be added .Wrong user type", user));
           break;
   }
    this.loggerService.log(user);
}

listCustomers () {
  return this.costumers;
}

getCustomerById(id){
  return this.costumers.find(u=>u.id===id);
}


getCustomersSorted() {
  return  this.costumers.sort((costumer1,costumer2)=>{
        if(costumer1.firstName<costumer2.firstName){
            return -1;
        }
       else if(costumer1.firstName===costumer2.firstName){
            return 0;
        }
        else{
            return 1;
        }
})
  }
}


