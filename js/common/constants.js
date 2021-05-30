const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_UP = 38;
const ARROW_DOWN = 40;
const SPACE = 32;

const MOVEMENT_FRAMES = 10
const SPEED = 1
const GRAVITY = 0.4

const PLAYER_MAX_LIFE = 250
const POTION_LIFE = 20

const ENEMY_1_CONFIG = {
    vx: 3,
    width: 280,
    height: 280,
    images: {
        walk: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character1/Walk/spritesheet.png',
        attacked: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character1/Get Electric/spritesheet.png',
        attack: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character1/Hit/spritesheet.png'
    },
    sounds: {
        attack: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/hit.wav',
        attacked: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/enemy/death_02.wav'
    },
    attackLife: 3
}

const ENEMY_2_CONFIG = {
    vx: 3.2,
    width: 280,
    height: 280,
    images: {
        walk: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character2/Walk/spritesheet.png',
        attacked: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character2/Get Electric/spritesheet.png',
        attack: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character2/Hit/spritesheet.png'
    },
    sounds: {
        attack: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/hit.wav',
        attacked: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/enemy/death_03.wav'
    },
    attackLife: 1.5
}

const ENEMY_3_CONFIG = {
    vx: 3,
    width: 280,
    height: 280,
    images: {
        walk: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character3/Walk/spritesheet.png',
        attacked: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character3/Get Electric/spritesheet.png',
        attack: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Enemies/Enemy Character3/Hit/spritesheet.png'
    },
    sounds: {
        attack: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/player/hit.wav',
        attacked: 'https://shirley-gianina.github.io/Mad-Scientist/assets/Sounds/enemy/death_05.wav'
    },
    attackLife: 3
}