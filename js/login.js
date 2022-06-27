const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

/*método para o 'botão' acionar somente quando tiver o minímo de caracteres exigidos */
const validateInput = ({ target }) => {
    if (target.value.length > 2 /*tamanho de caracteres, que é 3 */) {
        button.removeAttribute('disabled');
        return;
    }
    /*esse, 'se não', é para voltar quando não está selecionado o botão */
    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    /*anular a submição de ir direto carregar a pagina, em caso de evento */
    event.preventDefault();
    
    /*essa linha, salva o que foi informado na caixa, 'player' = variável do atributo */
    localStorage.setItem('player', input.value);
    /*redirecionar para próxima página ao clicar no botão */
    window.location = 'pages/game.html'; 
}

/*validação de eventos, ex.: entrada de informações e envio */
input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);