var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// ! QUERIES
// there are 151 pokemon
var allPokemonQuery = "\n  query {\n    pokemons(first: 151) {\n      name\n    }\n  }\n";
var pokemonInfoQuery = "\n  query pokemon($name: String){\n    pokemon(name: $name) {\n      image\n      number\n      classification\n    }\n  }\n";
// ! HTTP REQUESTS
function fetchAllPokemon() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://graphql-pokemon2.vercel.app", {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            query: allPokemonQuery
                        })
                    })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
;
function fetchPokemonInfo(name) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://graphql-pokemon2.vercel.app", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            query: pokemonInfoQuery,
                            variables: { name: name }
                        })
                    })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
// ! Start app
fetchAllPokemon()
    .then(function (_a) {
    var pokemons = _a.data.pokemons;
    // attach a list of pokemons
    var ul = document.createElement("ul");
    pokemons.forEach(function (pokemon) {
        var li = document.createElement("li");
        li.innerHTML = pokemon.name;
        // a flag to prevent appending pokemon info
        var clicked = false;
        // add an event listener to the li so that the user may see more details on click
        li.addEventListener("click", function () {
            if (clicked)
                return;
            else
                clicked = true;
            fetchPokemonInfo(pokemon.name)
                .then(function (_a) {
                var data = _a.data;
                var pokemon = data.pokemon;
                var image = document.createElement("IMG");
                image.src = pokemon.image;
                li.appendChild(image);
                var number = document.createElement("p");
                number.innerHTML = "Pokemon: " + pokemon.number;
                li.appendChild(number);
                var classification = document.createElement("p");
                classification.innerHTML = "Classification: " + pokemon.classification;
                li.appendChild(classification);
            });
        });
        ul.appendChild(li);
    });
    document.body.appendChild(ul);
});
