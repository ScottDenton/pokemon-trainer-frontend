const searchForm = document.getElementById("searchForm")
const errorField = document.getElementById("error")

searchForm.addEventListener('submit', fetchPokemon)
// trainerButton.addEventListener('click', fetchNewUser)


// function fetchNewUser (){
//   const body = {
//     name: "Scott",
//     age: 30,
//     email: "Scott@example.com",
//     password: "Password"
//   }
//
//   fetch('http://localhost:3000/trainers', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(body)
//   })
//   .then(resp => resp.json())
//   .then(console.log)
// }

function fetchPokemon(e){
  e.preventDefault()
  $("#pokemonImage").removeClass('runAway')
  errorField.innerHTML = ''
  const name = $("#pokemonName").val().toLowerCase()
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then(resp => resp.json())
  .then(data => {
    errorField.innerHTML=''
    $("#pokemonImage").attr('src', data.sprites.front_default),
    $("#pokemonImage").attr('alt', data.name)
    updateInfoField(data)
  })
  .catch(error => displayError(`It appears there was an error, please check the name you entered and try again`))
}

function updateInfoField(data){
  const info = document.getElementById("infoField")
  info.innerHTML = ''
  const name = document.createElement('h3')
  name.textContent = data.name.toUpperCase();
  info.appendChild(name)

  const catchButton = document.createElement('button')
  catchButton.textContent = "Try Catch it"
  catchButton.onclick= () => catchPokemon(data)
  info.appendChild(catchButton)

  const height = document.createElement('h4')
  height.textContent = `Height: ${data.height} feet`
  info.appendChild(height)

  const weight = document.createElement('h4')
  weight.textContent = `Weight: ${data.weight} pounds`
  info.appendChild(weight)

  const abilities = document.createElement("h4")
  abilities.textContent = "Abilities"
  info.appendChild(abilities)

  const ul = document.createElement('ul')
  data.abilities.forEach(power=> {
    let li = document.createElement('li')
    li.classList.add('ability')
      li.textContent = power.ability.name
      ul.appendChild(li)
  })
  info.appendChild(ul)
}

function displayError(error){
  errorField.textContent = error
}

function catchPokemon(data){
  const odds = Math.random() + data.base_experience/1000
  console.log('base', data.base_experience)
  console.log(odds)
  odds < 0.7 ? caughtPokemon(data): missedPokemon(data)
}

function caughtPokemon(data){
  alert(`WOOOOOO you caught a ${data.name}. You will be able to find it in your pokedex`)
  const body = {trainer_id: 1,
     pokedex_id: data.id,
     name: data.name,
     pokemon_type: data.types[0].type.name,
     height: data.height,
     weight: data.weight,
     sprite_front: data.sprites.front_default,
     sprite_back: data.sprites.back_default
   }

  fetch('http://localhost:3000/pokemons',{
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(console.log)
}

function missedPokemon(data){
  displayError(`Sorry ${data.name} ran away`)
  $("#pokemonImage").attr('src', data.sprites.back_default)
  $("#pokemonImage").addClass('runAway')
  $("#infoField").html('')
}



















//
