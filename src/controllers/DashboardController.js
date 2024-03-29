const Job = require("../model/Job")
const JobUtils = require("../utils/JobUtils")
const Profile = require("../model/Profile")

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length
    }
    //Total de horas por dia de cada Job em Progresso
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      //ajustes nos jobs
      //calculo de temp restante
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      
      // Status = done
      // statusCount[done] +=1 
      // Somando a quantidade de status
      statusCount[status] += 1;

      //Total de horas por dia de cada Job em Progresso
       jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

    
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });

    // qtd de horas que quero trabalhar MENOS quantidade de Horas/dia
    const freeHours = profile["hours-per-day"] - jobTotalHours;


    return res.render("index", { profile: profile, jobs: updatedJobs, statusCount, freeHours : freeHours});
  },
};
