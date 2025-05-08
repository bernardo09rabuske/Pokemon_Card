function getPokemonLocal(){
    const pokemon = JSON.parse(localStorage.getItem("pokemon"))
    console.log(pokemon,"pokemon local")
    const divPoke = document.querySelector(".pokemon_local")
    divPoke.insertAdjacentHTML("beforeend",`
        <button class="add">
            <img src="./img/pokebola.jpg" alt="">
        </button>
        <img src=${pokemon.sprites.front_default}>
          <p>Base experience: ${pokemon.base_experience}</p>
          <p>Abilities</p>
          <div class="abilities">
            
          </div>
        `)
    getAbilities(pokemon)
    const btnAdd = document.querySelector(".add")
    btnAdd.addEventListener("click",()=>{
        addPokemon(pokemon)
    })
}
getPokemonLocal()
function getAbilities(pokemon){
    const divAbilities = document.querySelector(".abilities")
    pokemon.abilities.forEach((item)=>{
        divAbilities.insertAdjacentHTML("beforeend",`
            <p>${item.ability.name}</p>
            
            `)
    })
}   
async function addPokemon(pokemon){
    console.log(pokemon,"add")

}