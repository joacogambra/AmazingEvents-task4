async function getStats(){
    try{
        let res = await fetch('https://mh-amazing.herokuapp.com/amazing')
        let data = await res.json()      
        let eventos = data.events
        let past = eventos.filter(events => data.date > events.date)       
        let pastcategories = new Set(past.map(event => event.category))
        pastcategories = [...pastcategories]
        let categoriesPastSort = [...pastcategories].sort()      
        past.map(everyEvent => {
            let assistance =  everyEvent.assistance
            let capacity =  everyEvent.capacity
            let percentage  = (100 * (assistance / capacity)).toFixed(2)
            everyEvent.percentage = percentage
            let ganancy = everyEvent.price * everyEvent.assistance
            everyEvent.gain = ganancy
        })
        let orderPercentage = [...past].sort((a,b)=>a.percentage - b.percentage)
        let highestPercentage = orderPercentage[orderPercentage.length - 1]
        let lowestPercentage = orderPercentage[0]
        let orderCapacity = [...past].sort((a,b)=> b.capacity - a.capacity )
        let highestCapacity = orderCapacity[0]
        renderTable1(highestPercentage,lowestPercentage,highestCapacity) 

        const reduceStats = (array) => {
            let initialStat = {
                category: "",
                gain: 0,
                capacity: 0,
                assistance: 0,
            }
            let stats = array.reduce((element1,element2) => {
                return {
                    category: element2.category,
                    gain: element1.gain + element2.gain,
                    capacity: element1.capacity + element2.capacity,
                    assistance: element1.assistance + element2.assistance,
                }
            }, initialStat)
            stats.percentage = (100 * (stats.assistance / stats.capacity)).toFixed(2)
            return stats
        }
        let arrayPastEvents = categoriesPastSort.map(categ =>{
           let arrayFiltrado = past.filter(singleEvent => singleEvent.category === categ)
           return reduceStats(arrayFiltrado)
        })
        let orderByPercent = [...arrayPastEvents].sort((a,b)=>b.percentage - a.percentage)
        renderTable3(orderByPercent)

        let upcoming = eventos.filter(events => data.date < events.date)
        let upcomingCategories = new Set(upcoming.map(event => event.category))
        upcomingCategories = [...upcomingCategories] 
        let categoriesUpcomingSort = [...upcomingCategories].sort()
        upcoming.map(everyEvent => {
            let estimate =  everyEvent.estimate
            let capacity =  everyEvent.capacity
            let percentage  = (100 * (estimate / capacity)).toFixed(2)
            everyEvent.percentage = percentage
            let ganancy = everyEvent.price * everyEvent.estimate
            everyEvent.gain = ganancy
        })
        const reduceStats2 = (array) => {
            let initialStat = {
                category: "",
                gain: 0,
                capacity: 0,
                estimate: 0,
            }
            let stats = array.reduce((element1,element2) => {
                return {
                    category: element2.category,
                    gain: element1.gain + element2.gain,
                    capacity: element1.capacity + element2.capacity,
                    estimate: element1.estimate + element2.estimate,
                }
            }, initialStat)
            stats.percentage = (100 * (stats.estimate / stats.capacity)).toFixed(2)
            return stats
        }
        let arrayUpcomingEvents = categoriesUpcomingSort.map(categ =>{
           let arrayFiltrado = upcoming.filter(singleEvent => singleEvent.category === categ)
           return reduceStats2(arrayFiltrado)
        })
        let orderByPercent2 = [...arrayUpcomingEvents].sort((a,b)=>b.percentage - a.percentage)
        renderTable2(orderByPercent2)


    } catch (error){
        console.log(error)
    }
}
getStats()

function renderTable1 (hPercentage, lPercentage,hCapacity){
    let table1 = document.getElementById('table1')
    table1.innerHTML += `<tr>
    <td>${hPercentage.name}: ${hPercentage.percentage}%</td>
    <td>${lPercentage.name}: ${lPercentage.percentage}%</td>
    <td>${hCapacity.name}: ${hCapacity.capacity}</td> </tr>`
}

function renderTable3(parametro){
    parametro.forEach((event)=>{
        let table3 = document.getElementById('table3')
        table3.innerHTML += `<tr>
        <td>${event.category}</td>
        <td>$ ${event.gain}</td>
        <td> ${event.percentage}%</td> </tr>`
    }) 
}

function renderTable2(parametro){
    parametro.forEach((event)=>{
        let table2 = document.getElementById('table2')
        table2.innerHTML += `<tr>
        <td>${event.category}</td>
        <td>$ ${event.gain}</td>
        <td>${event.percentage} % </td> </tr>`
    }) 
}




