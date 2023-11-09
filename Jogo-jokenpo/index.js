const vida = {
    VidaMaquina: 3,
    VidaUsuario: 3,
};
let nomeUsuario = localStorage.getItem('nome');

if (!nomeUsuario) {
    nomeUsuario = window.prompt("Qual é o seu nome?");
    localStorage.setItem('nome', nomeUsuario);
}
document.getElementById("Nomeplacar").innerHTML = nomeUsuario;

let botaoRecarregar2 = document.getElementById("button-reload2");

botaoRecarregar2.addEventListener("click", function () {
    location.reload();
}, 3000);

document.getElementById("hidden-end").classList.add("oculto");

let RespostaUser;
let Tesoura = "Tesoura" || document.getElementsByClassName("Buttton1");
let Papel = "Papel" || document.getElementsByClassName("Buttton2");
let Pedra = "Pedra" || document.getElementsByClassName("Buttton3");
let vencedorMaquina = "Maquina Venceu";
let vencedorUsuario = `${nomeUsuario} Venceu`;

let botao1 = document.getElementById("button1");
let botao2 = document.getElementById("button2");
let botao3 = document.getElementById("button3");
let botao4 = document.getElementById("mudar-nome");

function botaoClicado(event) {
    RespostaUser = event.target.textContent; 
    console.log("Resposta do usuário: " + RespostaUser);
    vencedor(RespostaUser); 

    atualizarImagens(RespostaUser);
}

botao1.addEventListener("click", botaoClicado);
botao2.addEventListener("click", botaoClicado);
botao3.addEventListener("click", botaoClicado);
botao4.addEventListener("click", MudarNome);

function randomWord() {
    const palavras = ["Pedra", "Papel", "Tesoura"];
    const randomIndex = Math.floor(Math.random() * palavras.length);
    return palavras[randomIndex];
}

function MudarNome(event) {
    let novoNome = window.prompt("Qual é o seu novo nome?");
    if (novoNome !== null) {
        nomeUsuario = novoNome;
        localStorage.setItem('nome', novoNome);
        document.getElementById('Nomeplacar').innerHTML = nomeUsuario;
        vencedorUsuario = `${nomeUsuario} Venceu`;
        vencedor(RespostaUser);
    }
}
function diminuirVida(usuario) {
    if (usuario === "usuario") {
        vida.VidaUsuario--;
        document.getElementById("user-score").innerHTML = vida.VidaUsuario;
    } else if (usuario === "maquina") {
        vida.VidaMaquina--;
        document.getElementById("machine-score").innerHTML = vida.VidaMaquina;
    }
}

function exibirPlacar() {
    console.log(`Vida da Máquina: ${vida.VidaMaquina}`);
    console.log(`Vida do Usuário: ${vida.VidaUsuario}`);
}

function vencedor(Respostausuario) {
    let palavraAleatoria = randomWord();

    if (RespostaUser == null) {
        console.log("esperando Escolha do(a) " + nomeUsuario);
        document.getElementById("result-text").innerHTML = `Esperando sua Opção de jogada, ${nomeUsuario}`;
        let SemResultadoUsuario = document.getElementById("imagens-result1");
        let SemResultadoMaquina = document.getElementById("imagens-result2");
        SemResultadoUsuario.src = "imagens/interrogation.svg"
        SemResultadoMaquina.src = "imagens/interrogation.svg"
    } else {
        if (palavraAleatoria === Respostausuario) {
            console.log("Empate");
            document.getElementById("result-text").innerHTML = "empate";
        } else if (palavraAleatoria === Tesoura && Respostausuario === Papel) {
            console.log(vencedorMaquina);
            document.getElementById("result-text").innerHTML = vencedorMaquina;
            diminuirVida("usuario");
        } else if (palavraAleatoria === Tesoura && Respostausuario === Pedra) {
            console.log(vencedorUsuario);
            document.getElementById("result-text").innerHTML = vencedorUsuario;
            diminuirVida("maquina");
        } else if (palavraAleatoria === Papel && Respostausuario === Tesoura) {
            console.log(vencedorUsuario);
            document.getElementById("result-text").innerHTML = vencedorUsuario;
            diminuirVida("maquina");
        } else if (palavraAleatoria === Papel && Respostausuario === Pedra) {
            console.log(vencedorMaquina);
            document.getElementById("result-text").innerHTML = vencedorMaquina;
            diminuirVida("usuario");
        } else if (palavraAleatoria === Pedra && Respostausuario === Papel) {
            console.log(vencedorUsuario);
            document.getElementById("result-text").innerHTML = vencedorUsuario;
            diminuirVida("maquina");
        } else if (palavraAleatoria === Pedra && Respostausuario === Tesoura) {
            console.log(vencedorMaquina);
            document.getElementById("result-text").innerHTML = vencedorMaquina;
            diminuirVida("usuario");
        }

        atualizarImagens(RespostaUser, palavraAleatoria);

        exibirPlacar();

        if (vida.VidaUsuario == 0 || vida.VidaMaquina == 0) {
            document.getElementById("hidden-end").classList.remove("oculto");
            if (vida.VidaUsuario == 0) {
                document.getElementById("h1-end").innerHTML = `${nomeUsuario}, perdeu para a maquina`;
                let amassou = document.getElementById("imagem-final");
                amassou.src = "imagens/l.svg"
            } else if (vida.VidaMaquina == 0) {
                document.getElementById("h1-end").innerHTML = ` ${nomeUsuario}, Voce Ganhou`;
                let amassado = document.getElementById("imagem-final");
                amassado.src = "imagens/trofeu.svg"
            }
        }
    }
}

function atualizarImagens(respostaUsuario, palavraAleatoria) {
    const ImagensResult1 = document.getElementById("imagens-result1");
    const ImagensResult2 = document.getElementById("imagens-result2");

    switch (respostaUsuario) {
        case Pedra:
            ImagensResult1.src = "imagens/pedra-btn.svg";
            break;
        case Tesoura:
            ImagensResult1.src = "imagens/tesoura-btn.svg";
            break;
        case Papel:
            ImagensResult1.src = "imagens/papel-btn.svg";
            break;
        default:
            break;
    }

    switch (palavraAleatoria) {
        case Pedra:
            ImagensResult2.src = "imagens/pedra-btn.svg";
            break;
        case Tesoura:
            ImagensResult2.src = "imagens/tesoura-btn.svg";
            break;
        case Papel:
            ImagensResult2.src = "imagens/papel-btn.svg";
            break;
        default:
            break;
    }
}

vencedor(RespostaUser)