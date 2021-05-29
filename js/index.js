window.onload = () => {
    const gameBoard =  document.getElementById('game-board')
    const gameStart = document.getElementById('game-start')
    const playBtn = document.getElementById('play');
    const loading = document.getElementById('loading')
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const game = new Game(ctx);

    document.addEventListener('keydown', (event) => {
        game.onKeyEvent(event)
    })

    document.addEventListener('keyup', (event) => {
        game.onKeyEvent(event)
    })
    

    playBtn.addEventListener('click', (event) => {
        gameBoard.classList.remove('hidden')
        gameStart.classList.add('hidden')
        game.start()
    })

    let loadingPercentage = 0;

    const interval = setInterval(() => {
        loadingPercentage++;
        loading.innerText = loadingPercentage
        if(loadingPercentage === 100) {
            clearInterval(interval)
            playBtn.classList.remove('hidden')
        }
    }, 1)
};

