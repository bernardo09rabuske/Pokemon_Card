import {colors} from "./colors.js"
let offset = 0
function montarHeader(){
    const header = document.querySelector("header")
    const user = localStorage.getItem("Logado")
    if(user){
        header.insertAdjacentHTML("beforeend",`
            <h1>My Pokémon</h1>
        <nav>
            <a id="logout" href="/">Sair</a>
            <img src="./baixados.jpg" alt="">
        </nav>

            `)
            const logout = document.querySelector("#logout")
            logout.addEventListener("click",()=>{
                localStorage.clear()
                header.innerHTML = ""
                header.insertAdjacentHTML("beforeend",`
                    <a href="/login/">Login</a>
                    <a href="/cadastro/">Cadastrar-se</a>
                    
                    `)
            })
    }else {
        header.insertAdjacentHTML("beforeend",`
            <h1> My Pokémons </h1>
        <nav>
            <a href="/login/">Login</a>
            <a href="/cadastro/">Cadastrar-se</a>
            <img src="./pokemon/img/pokebola.jpg" alt="pokebola">
        </nav>
            
            `)
    }
}
montarHeader()
async function initPokedex(){
    const ul = document.querySelector(".pokemons")
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon`,{
        headers: {
            "Content-type":"application/json; charset=utf-8"
        }
    })
    const response = await res.json()
    console.log(response,"response")
    const listPokemon = response.results
    for(let item of listPokemon){
        const data = await fetch(item.url,{
            headers: {
                "Content-type":"application/json; charset=utf-8"
            }
        })
        const dados = await data.json()
        ul.insertAdjacentHTML("beforeend", `
            <li style="background-color:${colors[dados.types[0].type.name]};"class="borda" id="${item.name}" data-types="${dados.types.map(t => t.type.name).join(',')}">
                <div class="card-header">
                    <span class="pokemon-name">${dados.name}</span>
                    <span class="hp">HP ${dados.stats[0].base_stat}</span>
                </div>
                <img src="${dados.sprites.other['official-artwork'].front_default}" alt="${dados.name}">
                <div class="info">
                    <p><strong>Tipo:</strong> ${dados.types.map(t => t.type.name).join(', ')}</p>
                    <p><strong>Ataque:</strong> ${dados.moves[0]?.move.name || 'N/A'}</p>
                    <p><strong>Poder:</strong> ${dados.stats[1].base_stat}</p>
                </div>
                <button class="add-pokedex">Mais Detalhes</button>
            </li>
        `)
        
        
            const btnPokemon = document.getElementById(item.name)
            btnPokemon.addEventListener("click",()=>{
                // console.log("aki",item.name,dados)
                localStorage.setItem("pokemon",JSON.stringify(dados))
                location.href = "/pokemon"
            })
    }
    const prevBtn = document.querySelector("#volta")
   
    const btnNext = document.querySelector("#proximo")
    btnNext.addEventListener("click",()=>{
        offset = offset+20
        prevBtn.removeAttribute("disabled")
        nextPage()
    })
    prevBtn.addEventListener("click",()=>{
        offset = offset-20
        if(offset===0){
            prevBtn.setAttribute("disabled",true)
        }
        nextPage()
    })
    prevBtn.setAttribute("disabled",true)
    document.querySelector("#searchBtn").addEventListener("click", () => {
        const inputName = document.querySelector("#typeSearch").value.toLowerCase();
        const cards = document.querySelectorAll("li.borda");
        cards.forEach(card => {
            const name = card.querySelector(".pokemon-name").textContent.toLowerCase();
            card.style.display = name.includes(inputName) ? "block" : "none";
        });
    });
    
    
    
   
}
initPokedex()
async function nextPage(){
    const ul = document.querySelector(".pokemons")
    ul.innerHTML = ""
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`,{
        headers: {
            "Content-type":"application/json; charset=utf-8"
        }
    })
    const response = await res.json()
    console.log(response,"response")
    const listPokemon = response.results
    for(let item of listPokemon){
        const data = await fetch(item.url,{
            headers: {
                "Content-type":"application/json; charset=utf-8"
            }
        })
        const dados = await data.json()
        ul.insertAdjacentHTML("beforeend", `
            <li style="background-color:${colors[dados.types[0].type.name]};" class="borda" id="${item.name}" data-types="${dados.types.map(t => t.type.name).join(',')}">
                <div class="card-header">
                    <span class="pokemon-name">${dados.name}</span>
                    <span class="hp">HP ${dados.stats[0].base_stat}</span>
                </div>
                <img src="${dados.sprites.other['official-artwork'].front_default}" alt="${dados.name}">
                <div class="info">
                    <p><strong>Type:</strong> ${dados.types.map(t => t.type.name).join(', ')}</p>
                    <p><strong>Attack:</strong> ${dados.moves[0]?.move.name || 'N/A'}</p>
                    <p><strong>Power:</strong> ${dados.stats[1].base_stat}</p>
                </div>
                <button class="add-pokedex">Mais Detalhes</button>
            </li>
        `)
        
    }
}
document.addEventListener("click", e => {
    if (e.target.classList.contains("add-pokedex")) {
        const card = e.target.closest("li.borda");
        const name = card.querySelector(".pokemon-name").textContent;
        const hp = card.querySelector(".hp").textContent;
        const type = card.querySelector(".info p").textContent;
        const attack = card.querySelectorAll(".info p")[1].textContent;
        const power = card.querySelectorAll(".info p")[2].textContent;
        const imgSrc = card.querySelector("img").src;

        const pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];
        pokedex.push({ name, hp, type, attack, power, imgSrc });
        localStorage.setItem("pokedex", JSON.stringify(pokedex));
       
    }
});
