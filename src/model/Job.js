const Database = require('../db/config')

let data = [
    {
            id:1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,     
            created_at: Date.now()  //atribuindo uma nova data
  },
    {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,     
             created_at: Date.now() //atribuindo uma nova data
    },
];

module.exports ={
    async get(){
        const db = await Database()
        
        await  db.all(`SELECT * FROM jobs`)

        console.log(data2)

        await db.close()

        return data
    },
    update(newJob){
        data = newJob
    },
    delete(id){
        data = data.filter(job => Number(job.id) !== Number(id))
    },

    create(newJob){
         
        data.push(newJob)
    }
}

