import { BaseLogger, ElasticLogger, MongoLogger } from "../crossCuttinConcerns/logging/logger.js";
import Costumer from "../models/costumer.js";
import User from "../models/user.js";
import UserService from "../services/userService.js";

let logger1 = new MongoLogger();
let userService = new UserService(logger1);
let user1 = new User(1,"Sercan","Masar", "Samsun");
let user2 = new User(2,"Gülhan","Genc", "İzmir");

userService.add(user1);
userService.add(user2);

//console.log(userService.listCustomers ());
//console.log(userService.getCustomerById(id));
//userService.list();
//userService.getById(id);
/*
//prototyping
let costumer = {id:1, firstName:"Sercan",};
costumer.lastName="Masar"; sonradan bir bilgi ekleneblilyor.
console.log(costumer.lastName)  */

userService.load();

let customerToAdd = new Costumer(1,"seda","yılmaz", "Samsun", "asasasf");
customerToAdd.type = "costumer";
userService.add(customerToAdd);

console.log(userService.costumers);
console.log(userService.employees);
console.log(userService.errors);
console.log(userService.getCustomersSorted())

