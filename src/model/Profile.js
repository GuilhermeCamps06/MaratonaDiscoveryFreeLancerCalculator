let data = {    
    name: "Guilherme",
    avatar: "https://avatars.githubusercontent.com/u/39139874?s=400&u=02cc7bf3fcdf420214e090723132653e1b7d7fe3&v=4",
    "monthly-budget": 3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year":4,
    "value-hour": 75
   };
   
module.exports ={
  get(){
    return data;
  },
  update(newData){
    data = newData;
   }
}