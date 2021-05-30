// calcula un numero aleatorio entre un minimo y un maximo
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;


function calculateCenter(element) {
    return {
        X: (element.pos.x + element.pos.x + element.width) / 2,
        Y: (element.pos.y + element.pos.y + element.height) / 2,
    }
}

function collidesWith(element1, element2) {
    // comprueba si 2 elementos estan colisionando
    const circle1 = calculateCenter(element1);
    const circle2 = calculateCenter(element2);

    const dx = circle1.X - circle2.X;
    const dy = circle1.Y - circle2.Y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
        return true
    }

     return false
}
