import {colors} from "../colors.js"
async function getPokedex(){
    const userId = localStorage.getItem("userId")
    const res = await fetch(`http://localhost:3001/pokemon?userId=${userId}`)
    const response = await res.json()
    console.log(response,"response")

     const ul = document.querySelector(".pokemons")
   
    for(let item of response){
        
        const dados = item.pokemon
        console.log(dados,"dados")
        ul.insertAdjacentHTML("beforeend",`
            <li style="background-color:${colors[dados.types[0].type.name]};" id=${item.name}>
                <p>${dados.name}</p>
                <img src="${dados.sprites.front_default}">
            </li>
            `)
           
    }
    
}

getPokedex()