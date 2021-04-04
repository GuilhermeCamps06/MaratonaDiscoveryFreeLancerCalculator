const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const Profile = {
    data:{
        
            name: "Guilherme",
            avatar: "https://avatars.githubusercontent.com/u/39139874?s=400&u=02cc7bf3fcdf420214e090723132653e1b7d7fe3&v=4",
            "monthly-budget": 3000,
            "days-per-week":5,
            "hours-per-day":5,
            "vacation-per-year":4,
            "value-hour": 75
        
    },
    controllers: {
        index(req, res){
            return res.render(views + "profile", {profile: Profile.data})
        },

    update(req, res){
        // req.body para pegar os dados
        const data = req.body
        // definir quantas semanas tem num ano
        const weeksPerYear = 52
        // remover as semanas de férias do ano, para pegar quantas semanas tem num mes
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12
        // quantas horas por semana trabalhadas
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        // total de horas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth 
        // valor da hora
        const valueHour = data["monthly-budget"] / monthlyTotalHours
        
        Profile.data = {
         ...Profile.data, 
         ...req.body,
         "value-hour": valueHour
           }
          return res.redirect('/profile') 
        }    
    }   
 }


const Job = {
   data: [
    
        {
                id:1,
                name: "Pizzaria Guloso",
                "daily-hours": 2,
                "total-hours": 1,     
                created_at: Date.now(),   //atribuindo uma nova data
         
        },
        {
                id: 2,
                name: "OneTwo Project",
                "daily-hours": 3,
                "total-hours": 47,     
                 created_at: Date.now(), //atribuindo uma nova data
        },
        
   ],

    controllers: {
        index(req, res){
            const updatedJobs = Job.data.map((job) => {
                //ajustes nos jobs
                //calculo de temp restante
                   const remaining = Job.services.remainingDays(job)   
                   const status = remaining <= 0? 'done' : 'progress'      
                   return {
                       ...job,
                       remaining,
                       status,
                       budget: Profile.data["value-hour"]*job["total-hours"]
               } 
         })
    
           return res.render(views + "index",{profile: Profile.data, jobs: updatedJobs })
      },

        create(req, res){
            return res.render(views + "job")
        },

        save(req, res){
            const lastId = Job.data[Job.data.length - 1]?.id || 1;

            Jobs.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],     
                created_at: Date.now()   //atribuindo uma nova data
            })    
            return res.redirect('/')
        }
   },


services: {
    remainingDays (job) {
        const remainingDays = ( job["total-hours"] / job["daily-hours"]).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDate = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs  = dueDate - Date.now();
        //transfromar milli em dias

        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

         //Restam x dias i   
        return dayDiff
    }
 },
}


routes.get('/', Job.controllers.index)
routes.get('/job',  Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)    

module.exports = routes;