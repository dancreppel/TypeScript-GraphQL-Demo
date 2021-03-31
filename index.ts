// ! QUERIES
// there are 151 pokemon
var allPokemonQuery: string = `
  query {
    pokemons(first: 151) {
      name
    }
  }
`

var pokemonInfoQuery: string = `
  query pokemon($name: String){
    pokemon(name: $name) {
      image
      number
      classification
    }
  }
`

// ! HTTP REQUESTS
async function fetchAllPokemon() {
  const res = await fetch("https://graphql-pokemon2.vercel.app", {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: allPokemonQuery
    })
  })
  return res.json();
};

async function fetchPokemonInfo(name: string) {
  const res = await fetch("https://graphql-pokemon2.vercel.app", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: pokemonInfoQuery,
      variables: { name }
    }),
  });
  return res.json();
}

// ! Start app
fetchAllPokemon()
  .then(({ data: { pokemons }}) => {
    // attach a list of pokemons
    let ul: HTMLUListElement = document.createElement("ul");

    pokemons.forEach(( pokemon ) => {
      let li: HTMLLIElement = document.createElement("li");
      li.innerHTML = pokemon.name;

      // a flag to prevent appending pokemon info
      let clicked: Boolean = false;
      
      // add an event listener to the li so that the user may see more details on click
      li.addEventListener("click", () => {
        if (clicked) return;
        else clicked = true;

        fetchPokemonInfo(pokemon.name)
          .then(({ data }) => {
            let { pokemon } = data;

            let image: HTMLImageElement = document.createElement("IMG");
            image.src = pokemon.image;
            li.appendChild(image);

            let number: HTMLParagraphElement = document.createElement("p");
            number.innerHTML = `Pokemon: ${pokemon.number}`;
            li.appendChild(number);

            let classification: HTMLParagraphElement = document.createElement(
              "p"
            );
            classification.innerHTML = `Classification: ${pokemon.classification}`;
            li.appendChild(classification);
          });
      });

      ul.appendChild(li);
    })

    document.body.appendChild(ul);
  });