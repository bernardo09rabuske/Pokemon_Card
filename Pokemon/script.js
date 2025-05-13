function getPokemonLocal(){
    const pokemon = JSON.parse(localStorage.getItem("pokemon"))
    console.log(pokemon,"pokemon local")
    const divPoke = document.querySelector(".pokemon_local")
    divPoke.insertAdjacentHTML("beforeend", `
        
        <button class="add">
            <img src="../baixados.jpg" alt="Adicionar">
        </button>
        <div class="pokeImg">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
        <div class="info">
      
          <h2>${pokemon.name.toUpperCase()}</h2>
          <p><strong>ID:</strong> ${pokemon.id}</p>
          <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
          <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
          <p><strong>Tipos:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p><strong>Base Experience:</strong> ${pokemon.base_experience}</p>
          <div class="abilities">
            <p><strong>Habilidades:</strong></p>
            
          </div>
        </div>
      `)
    getAbilities(pokemon)
    const btnAdd = document.querySelector(".add")
    btnAdd.addEventListener("click",()=>{
        addPokemon(pokemon)
    })
}
getPokemonLocal()
// const colors = {
//     normal : "#f6f5f2",
//     poison : "#da05ff",
//     grass : "#40ff00",
//     flying : "#98e5d3",
//     fire : "#ff9900",
//     dark : "#303030",
//     steel :"#949494",
//     eletric : "#ffe600",
//     water : "#0033ff",
//     bug : "#345b32",
//     dragon : "#3a6173"
    
// }
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
    const userId = localStorage.getItem("userId")
    const obj = {
        userId,
        pokemon
    }
    const res = await fetch("http://localhost:3001/pokemon",{
        method:"POST",
        body: JSON.stringify(obj),
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    })
    if(res.status===201){
        modal("Pokemon adicionado com sucesso!")
    }


}