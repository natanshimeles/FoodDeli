import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { GetAddressComponent } from '../get-address/get-address.component';
import { OrderService } from '../order.service';
export interface Order{
  item_id:number,
  no_of_order:number
  total:any

}
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})


export class NewOrderComponent implements OnInit {
  total : any = 0
  total_food = 0
  allFoods
  length_all_foods
  order:Order[] = []

  constructor(private orderService:OrderService,private router:Router) { }

  ngOnInit(): void {
    this.orderService.getPosition().then(res=>{
      //console.log(res);
      
    })

    this.orderService.getAllFoods().then(res=>{
      this.allFoods =  res
    
      this.length_all_foods = this.allFoods.length
      
    }
    ,
    err=>{
      console.log(err);
      
    })


 

  }

  getFood(id:number) {
    for(let i =0;i<this.allFoods.length;i++){
      if(this.allFoods[i].id==id ){
       
        
        return this.allFoods[i]
      }

    }
    return null  
  }

  addOrder(id:number){
    
    if(this.total_food > 7){
      return 
    }
    this.total_food++
    
    let a :number= 1
    let food = this.getFood(id)
    
    let result = this.order.filter(function(food) {
      return food.item_id == id;
      
    });
    if(result.length > 0){
      for(let i = 0;i<result.length;i++){
        result[i].no_of_order ++
        result[i].total = (  food.price * result[i].no_of_order).toFixed(2)

      }
      
      
    }
    else{ 
      this.order.push({item_id:id,no_of_order:a,total:food.price})


    }
    this.calcuateTotal()

  }

  minusOrder(id){
  
    if(this.total_food == 0){
      return 
    }
    let food = this.getFood(id)
    
    let result = this.order.filter(function(food) {
      return food.item_id == id;
      
    });
    
    if(result.length > 0){
      for(let i = 0;i<result.length;i++){
        result[i].no_of_order =  result[i].no_of_order - 1
        
        
        if(result[i].no_of_order==0){
          this.deleteOrder(id)
        }
        else{
          result[i].total = (  food.price * result[i].no_of_order).toFixed(2)
        }
        

      }
    }
    this.total_food--
    this.calcuateTotal()
    

  }
  calcuateTotal(){
    this.total = 0 
    console.log("calculate total");
    
    for(let i = 0 ;i <this.order.length;i++){
      console.log(this.order[i].total.toString());
      
      this.total = parseFloat(this.total.toString()) +  parseFloat(this.order[i].total.toString())
      this.total =this.total.toFixed(2)
    
    }

  }
  plusOrder(id){
  
    if(this.total_food > 7){
      return 
    }
    let food = this.getFood(id)
    
    let result = this.order.filter(function(food) {
      return food.item_id == id;
      
    });
    if(result.length > 0){
      for(let i = 0;i<result.length;i++){
        result[i].no_of_order ++
        result[i].total = (  food.price * result[i].no_of_order).toFixed(2)

      }
    }
    this.total_food++
    this.calcuateTotal()

  }
  deleteOrder(id){
    let total_no = 0
   
    if(this.total_food == 0){
      return 
    }
    let food = this.getFood(id)
    
    let result = this.order.filter(function(order) {
      return order.item_id == id;
      
    });
    
    if(result.length > 0){
      for(let i = 0 ;i<result.length;i++){
        total_no = total_no + result[i].total
        const index = this.order.indexOf(result[i]);
        
        
        if (index > -1) {
          this.order.splice(index,1);
        }

  

      }
      
     
    }
    
   console.log(result);
   this.total_food = this.total_food - total_no
   this.calcuateTotal()
   

  }

  finishOrder(){
    let order = this.order
    let navigationExtras: NavigationExtras = {
      queryParams: {data:JSON.stringify(order),total: this.total}
  };
    this.router.navigate(['checkout'],navigationExtras)
  }
  

}
