let offset = 0
//const searchInput = document.getElementById("searchName")
const colors = {
    normal : "#f6f5f2",
    poison : "#da05ff",
    grass : "#40ff00",
    flying : "#98e5d3",
    fire : "#ff9900",
    dark : "#303030",
    steel :"#949494",
    eletric : "#ffe600",
    water : "#0033ff",
    bug : "#345b32"
}
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
                    <p><strong>Type:</strong> ${dados.types.map(t => t.type.name).join(', ')}</p>
                    <p><strong>Attack:</strong> ${dados.moves[0]?.move.name || 'N/A'}</p>
                    <p><strong>Power:</strong> ${dados.stats[1].base_stat}</p>
                </div>
                <button class="add-pokedex">Adicionar à Pokédex</button>
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
                <button class="add-pokedex">Adicionar à Pokédex</button>
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
        // alert(`${name} adicionado à Pokédex!`);
    }
});
document.querySelector("#typeSearch").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.querySelector("#searchBtn").click();
    }
});
