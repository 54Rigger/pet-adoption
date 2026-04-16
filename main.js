    async function start(){
      const weatherPromise = await fetch('https://api.weather.gov/gridpoints/MFL/110,50/forecast')
      const weatherData = await weatherPromise.json()
      const currentTemp = weatherData.properties.periods[0].temperature
      document.querySelector("#temperature").textContent = currentTemp
  }
  start()

  async function getPets(){
    const petsPromise = await fetch('https://learnwebcode.github.io/bootcamp-pet-data/pets.json')
    const petsData = await petsPromise.json()
    console.log(petsData)
    document.querySelector(".list-of-pets").innerHTML = ""
    petsData.forEach(pet => {
        if(!pet.photo){pet.photo = "images/purrsloud 1.jpg"}
      const petCard = document.createElement("div")
      petCard.dataset.species = pet.species
      petCard.classList.add("pet-card")
      petCard.innerHTML = `
        <div class="pet-card-text">
          <h3>${pet.name}</h3>
          <p class="pet-description">${pet.description}</p>
          <p class="pet-age">${new Date().getFullYear() - pet.birthYear} Years Old</p>
        </div>
        <div class="pet-card-photo">
          <img src="${pet.photo}" alt="A ${pet.species} named ${pet.name}">
        </div>
      `
        
      document.querySelector(".list-of-pets").appendChild(petCard)
    })

    const allButtons = document.querySelectorAll(".pet-filter button")
    allButtons.forEach(el =>{ 
      el.addEventListener("click", handleButtonClick)
    })
    function handleButtonClick(e){
      
      //remove active class from all buttons
      allButtons.forEach(el => el.classList.remove("active"))
      //add active class to clicked button
      e.target.classList.add("active")
      //get the filter type from the button text
      const currentFilter = e.target.dataset.filter
      //loop through pet cards and hide/show based on filter
      const petCards = document.querySelectorAll(".pet-card").forEach(el => {
        if(currentFilter == el.dataset.species || currentFilter == "all"){
          el.style.display = "grid"
        } else {
          el.style.display = "none"
        }
      })
    }
  }
    getPets()

    //pet filter button code

    
