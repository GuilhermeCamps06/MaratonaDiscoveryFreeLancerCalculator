const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
    name: "Guilherme",
    avatar: "https://avatars.githubusercontent.com/u/39139874?s=400&u=02cc7bf3fcdf420214e090723132653e1b7d7fe3&v=4",
    "monthly-budget": 3000,
    "days-per-week":5,
    "hours-per-day":5,
    "vacation-per-year":4,
    "value-hour": 75
}
const jobs = [
{
        id:1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 60,     
        created_at: Date.now(),   //atribuindo uma nova data
 
},
{
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,     
         created_at: Date.now(), //atribuindo uma nova data
            
},
]

        function remainingDays (job) {
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

    routes.get('/', (req, res) => {

        const updateJobs = jobs.map((job) => {
    //ajustes nos jobs
    //calculo de temp restante
       const remaining = remainingDays(job)   
       const status = remaining <= 0? 'done' : 'progress'      
       return {
           ...job,
           remaining,
           status,
           budget: profile["value-hour"]*job["total-hours"]
    } 
    })

    res.render(views + "index",{profile,jobs: updateJobs})
})

    routes.get('/job', (req, res) => res.render(views + "job"))
    routes.post('/job', (req, res) =>{

    const lastId = jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],     
        created_at: Date.now()   //atribuindo uma nova data
    })    
    return res.redirect('/')
   });

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))
    

module.exports = routes;