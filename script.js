const nomesPokemon = ['pikachu', 'charmander', 'squirtle', 'bulbasaur', 'eevee'];

const tipoEmoji = {
  electric: '⚡ Elétrico',
  fire: '🔥 Fogo',
  water: '💧 Água',
  grass: '🍃 Planta',
  normal: '🐾 Normal'
};

async function buscarDados(nome) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
  const resposta = await fetch(url);
  const dados = await resposta.json();

  const tipoOriginal = dados.types[0].type.name;
  const tipoComEmoji = tipoEmoji[tipoOriginal] || tipoOriginal;

  const ataque = dados.stats.find(stat => stat.stat.name === 'attack').base_stat;
  const imagem = dados.sprites.front_default;

  return {
    nome: nome.charAt(0).toUpperCase() + nome.slice(1),
    tipo: tipoComEmoji,
    tipoId: tipoOriginal, // usado para filtro
    ataque,
    imagem
  };
}

async function criarCarta(pokemon) {
  const carta = document.createElement('div');
  carta.className = 'card';
  carta.setAttribute('data-tipo', pokemon.tipoId);

  carta.innerHTML = `
    <img src="${pokemon.imagem}" alt="${pokemon.nome}">
    <h2>${pokemon.nome}</h2>
    <p><strong>Tipo:</strong> ${pokemon.tipo}</p>
    <p><strong>Ataque:</strong> ${pokemon.ataque}</p>
  `;

  document.getElementById('cartas-container').appendChild(carta);
}

async function carregarCartas() {
  const container = document.getElementById('cartas-container');
  container.innerHTML = '';

  for (const nome of nomesPokemon) {
    const dados = await buscarDados(nome);
    criarCarta(dados);
  }
}

document.getElementById('tipo-select').addEventListener('change', () => {
  const tipoSelecionado = document.getElementById('tipo-select').value;
  const cartas = document.querySelectorAll('.card');

  cartas.forEach(carta => {
    const tipoCarta = carta.getAttribute('data-tipo');
    if (tipoSelecionado === 'todos' || tipoCarta === tipoSelecionado) {
      carta.style.display = 'block';
    } else {
      carta.style.display = 'none';
    }
  });
});

carregarCartas();
