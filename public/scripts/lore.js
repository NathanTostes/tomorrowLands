const storyText = `
No princípio, havia apenas o vazio e uma consciência suprema, um Deus, que vagava pela imensidão do nada. Ele iniciou o processo de criação de um universo, contudo, o ato de gerar vida e matéria em um espaço virgem exigia uma quantidade de energia imensurável. Essa energia, tão potente e inimaginável, atraiu anomalias, forças misteriosas que brotaram das fissuras entre a realidade e o vazio. Essas entidades caóticas, instigadas por intuitos desconhecidas, tinham um único propósito: impedir que o universo ganhasse forma.
`;

function typeWriterEffect(text, elementId, speed) {
    const element = document.getElementById(elementId);
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            document.getElementById('start-adventure').style.display = 'inline-block';
        }
    }

    type();
}

document.getElementById('start-adventure').addEventListener('click', () => {
window.location.href = '/game';
});

window.onload = () => {
typeWriterEffect(storyText, 'storyText', 80);
};