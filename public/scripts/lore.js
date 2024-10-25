const storyText = `
Texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto texto1
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
typeWriterEffect(storyText, 'storyText', 100);
};