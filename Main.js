var fundo = document.getElementById("somdefundo");
var malacaindo = document.getElementById("malacaindo");
var cereja = document.getElementById("cereja");
var bolo = document.getElementById("bolo");
var tijolo = document.getElementById("tijolo");
var win = document.getElementById("win");
var passarfase = document.getElementById("passarfase");
var perdeu = document.getElementById("perdeu");
var click = document.getElementById("click");
var selectedSkin = 'imagens/pessoas/pessoa1.png';

fundo.volume = 0.2;
fundo.loop = true;

window.onload = function() {
    fundo.play();
    var app = {
        dir: 1,
        lose: false,
        score: 0,
        level: 1,
        isPaused: false,
        moveTimeout: null,
        moveInterval: 10,
        moveTimer: null,
        currentSpeed: 8,
        speedIncrement: 0.5,
    
        init: function() {
            app.config();
            app.listener();
            app.setupGameplay();
            app.move();
        },
    
    
        setupGameplay: function() {
            let bgImage;
            if (app.level === 1) {
                bgImage = 'imagens/background/aeroporto.png';
            } else if (app.level === 2) {
                bgImage = 'imagens/background/confeitaria.png';
            } else if (app.level === 3) {
                bgImage = 'imagens/background/canteiro_obras.png';
            }
            document.querySelector('.gameplay').style.backgroundImage = `url('${bgImage}')`;
    
            document.getElementById('start-button').onclick = function() { 
                document.getElementById('start-screen').style.display = 'none';
                document.getElementById('game-screen').style.display = 'block';
                app.resetGame(true);
            };
        
            let firstBlock = document.getElementById('last');
            let gameplay = document.getElementById('gameplay');
            let gameplayWidth = gameplay.getBoundingClientRect().width;
            let blockWidth = firstBlock.getBoundingClientRect().width;
        
            let marginLeft = (gameplayWidth - blockWidth) / 2;
            firstBlock.style.marginLeft = marginLeft + 'px';
        
            if (app.level === 1) {
                firstBlock.style.backgroundImage = `url('${selectedSkin}')`; 
            } else {
                firstBlock.style.backgroundImage = `url('${selectedSkin}')`;
            }
            firstBlock.style.backgroundSize = "contain"; 
            firstBlock.style.backgroundPosition = "center"; 
            firstBlock.style.backgroundRepeat = "no-repeat";
        
            let playBlock = document.getElementById('play');
            playBlock.style.top = '0px';
            playBlock.style.marginLeft = marginLeft;
        
            if(app.level === 1){
                playBlock.style.backgroundImage = `url('imagens/malas/mala1.png')`;
            }else if(app.level === 2){
                playBlock.style.backgroundImage = `url('imagens/bolos/bolo1.png')`;
            }else if(app.level === 3){
                playBlock.style.backgroundImage = `url('imagens/tijolo.png')`;
            }
            playBlock.style.backgroundSize = "contain"; 
            playBlock.style.backgroundPosition = "center"; 
            playBlock.style.backgroundRepeat = "no-repeat";
        },
        
        
        
        applySkin: function() {
            let playBlock = document.getElementById('play');
            let lastBlock = document.getElementById('last');
        
            playBlock.style.backgroundImage = `url('${selectedSkin}')`;
            playBlock.style.backgroundSize = "contain"; 
            playBlock.style.backgroundPosition = "center"; 
            playBlock.style.backgroundRepeat = "no-repeat";
        
            lastBlock.style.backgroundImage = `url('${selectedSkin}')`;
            lastBlock.style.backgroundSize = "contain";
            lastBlock.style.backgroundPosition = "center";
            lastBlock.style.backgroundRepeat = "no-repeat";
            
        },
    
        move: function() {
            if (app.lose || app.isPaused) return;
        
            let margin = app.getMargin('play');
            let width = app.getWidth('play');
            let gameplayWidth = document.getElementById('gameplay').getBoundingClientRect().width;
        
            if (app.dir > 0) {
                if (margin + width < gameplayWidth) {
                    app.setMargin('play', margin += app.dir);
                } else {
                    app.dir = -app.dir;
                }
            } else {
                if (margin > 0) {
                    app.setMargin('play', margin += app.dir);
                } else {
                    app.dir = -app.dir;
                }
            }
        
            document.getElementById('play').style.top = '0px';
        
            let wrapper = document.getElementsByClassName('wrapper')[0];
            let gameplay = document.getElementsByClassName('gameplay')[0];
            let length = document.getElementsByClassName('block').length;
        
            let limit = app.level === 1 ? 15 : app.level === 2 ? 10 : 5;
            let until = length - limit;
            if (until < 0) until = 0;
        
            let height = gameplay.getBoundingClientRect().height + (30 * until);
            wrapper.style.height = height + 'px';
        
            clearTimeout(app.moveTimeout); 
            app.moveTimeout = setTimeout(app.move, app.currentSpeed); 
        
            document.getElementById('scores').innerHTML = app.score;
        },
    
        togglePause: function() {
            click.play();
            app.isPaused = !app.isPaused;
        
            const pauseButton = document.getElementById('pause-button');
            if (app.isPaused) {
                pauseButton.innerText = "Continuar";
                clearTimeout(app.moveTimeout);
            } else {
                pauseButton.innerText = "Pausar";
                app.move();
            }
        },
        
    
        getMargin: function(elem) {
            let margin = document.getElementById(elem).style.marginLeft.replace('px', '');
            margin = parseInt(margin);
            if (isNaN(margin)) margin = 0;
            return margin;
        },
    
        getWidth: function(elem) {
            let width = document.getElementById(elem).getBoundingClientRect().width;
            return parseInt(width);
        },
    
        setMargin: function(elem, margin) {
            document.getElementById(elem).style.marginLeft = margin + "px";
        },
    
        config: function() {
            
        },
    
        listener: function() {
            window.onkeydown = function(e) {
                if (app.lose) return;
        
                if (e.key === ' ' && !app.isPaused) {
                    app.fall();
                }
                else if (e.key === 'Shift') {
                    app.togglePause();
                }
            };
        
            document.getElementById('restart').onclick = function() {
                app.resetGame(true);
            };
        },
    
        fall: function() {
            if (app.isPaused || app.lose) return;
        
            app.currentSpeed -= app.speedIncrement;
            if (app.currentSpeed < 2) app.currentSpeed = 2;
        
            if (app.level === 1){
                malacaindo.play();
            } else if (app.level === 2){
                bolo.play();
            } else if (app.score === 29 && app.level === 2){
                cereja.play();
            } else if (app.level === 3){
                tijolo.play();
            }
            
            let play = document.getElementById('play');
            let gameplay = document.getElementById('gameplay');
            let gameplayRect = gameplay.getBoundingClientRect();
            let playRect = play.getBoundingClientRect();
        
            play.classList.add('cair_animation');
        
            let top = parseInt(play.style.top.replace('px', '')) || 0;
        
            let fallInterval = setInterval(function() {
                if (app.isPaused || app.lose) {
                    clearInterval(fallInterval);
                    return;
                }
                top += 20; 
                play.style.top = top + 'px';
                
        
                if (top + playRect.height >= gameplayRect.height) {
                    clearInterval(fallInterval);
                    play.style.top = (gameplayRect.height - playRect.height) + 'px';
                    play.classList.remove('cair_animation');
                    app.next();
                }
            }, 10);
        
            play.addEventListener('animationend', function() {
                play.classList.remove('cair_animation');
            });
        },
        
    
        next: function() {
            let play = document.getElementById('play');
            let wrapper = document.getElementsByClassName('wrapper')[0];
            let last = document.getElementById('last');
            let cur = play.getBoundingClientRect();
            let pos = last.getBoundingClientRect();
        
            play.style.top = "-100px"; 
        
            if (cur.left <= pos.left + pos.width && cur.left + cur.width >= pos.left) {
        
                let added = document.createElement('div');
                added.classList.add('block');
        
                let minWidth = 50;  
                let maxWidth = 120; 
                let newWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
                added.style.width = newWidth + 'px';
        
                let offset = (pos.width - newWidth) / 2;
                added.style.marginLeft = (parseFloat(last.style.marginLeft) || 0) + offset + 'px';
        
                let image;
                if (app.level === 1) {
                    let malaIndex = Math.floor(Math.random() * 4) + 1; 
                    image = 'imagens/malas/mala' + malaIndex + '.png';
                } else if (app.level === 2) {
                    if (app.score === 19) {
                        image = 'imagens/cereja.png';
                    } else {
                        let boloIndex = Math.floor(Math.random() * 3) + 1; 
                        image = 'imagens/bolos/bolo' + boloIndex + '.png';
                    }
                } else if (app.level === 3) {
                    image = 'imagens/tijolo.png';
                }
                added.style.backgroundImage = 'url(' + image + ')';
                added.style.backgroundSize = 'cover';
                added.style.backgroundPosition = 'center';
        
                last.id = ''; 
                play.id = 'last'; 
                added.id = 'play';
        
                app.score++;
                if(app.score >= 10 && app.level === 1){
                    passarfase.play();
                    app.levelUp(2, '#f1a1e4', 'Agora você trabalha numa confeitaria e o confeiteiro chefe precisa da sua ajuda para montar um bolo.');
                    app.currentSpeed = app.currentSpeed - 3;  
                } else if(app.score >= 20 && app.level === 2){
                    passarfase.play();
                    app.levelUp(3, '#f1a1e4', 'Agora você está em uma construção. Equilibre os tijolos para ajudar na obra.');
                    app.currentSpeed = app.currentSpeed - 5;  
                } else if(app.score >= 50 && app.level === 3){
                    win.play();
                    document.getElementById('winner').classList.add('active');
                }
                wrapper.appendChild(added);
                let blocks = document.getElementsByClassName('block');
                if (blocks.length > 6) {
                    wrapper.removeChild(blocks[1]);
                }
            } else {
                play.outerHTML = '';
                perdeu.play();
                app.lose = true;
                document.getElementById('lose').classList.add('active');

                app.currentSpeed -= app.speedIncrement;
			if (app.currentSpeed < 2) app.currentSpeed = 2;
            }
        },
    
        levelUp: function(newLevel, bgGradient, message) {
            app.level = newLevel;
            document.getElementById('game-screen').style.background = 'linear-gradient(135deg, ' + bgGradient + ')';
            let levelUpMessage = document.getElementById('level-up-message');
            levelUpMessage.innerHTML = `<h1>${message}</h1>`;
            levelUpMessage.classList.add('active');

            app.currentSpeed = 8 - (newLevel * 2);
			if (app.currentSpeed < 2) app.currentSpeed = 2;

            setTimeout(() => {
                levelUpMessage.classList.remove('active');
                app.resetGame(false);
            }, 3000); 
        },
    
        resetGame: function(resetScore) {
            app.lose = false;
            app.dir = 1;
        
            if (resetScore) {
                app.score = 0;
                app.level = 1;
            }
            document.getElementById('winner').classList.remove('active');
            document.getElementById('lose').classList.remove('active');
        
            let wrapper = document.getElementsByClassName('wrapper')[0];
            wrapper.innerHTML = `
                <div class='block' id='last'></div>
                <div class='block' id='play'></div>
            `;
        
            app.applySkin();
        
            document.getElementById('scores').innerHTML = app.score;
        
            app.init();
        }
         
    }
    setDifficultyLevel("easy", app);  
    document.getElementById('manual-screen').style.display = 'none';
    document.getElementById('skin-screen').style.display = 'none';
    document.getElementById('difficulty-screen').style.display = 'none';
    document.getElementById('creditos-screen').style.display = 'none';
    setupEventListeners(app);
    app.applySkin(); 
};

function setupEventListeners(app) {
    let start_screen = document.getElementById('start-screen');
    let game_screen = document.getElementById('game-screen');
    let manual_screen = document.getElementById('manual-screen');
    let config_screen = document.getElementById('config-screen');
    let skin_screen = document.getElementById('skin-screen');
    let difficulty_screen = document.getElementById('difficulty-screen');
    let volume_screen = document.getElementById('volume-screen');
    let creditos_screen = document.getElementById('creditos-screen');

    document.getElementById('start-button').onclick = function() {
        click.play();
        app.level = 1;
        app.levelUp(1, '#f1a1e4', 'Você trabalha num aeroporto e o piloto precisa da sua ajuda para despachar as malas. Quanto mais malas você equilibrar, mais gorjetas ganhará.');
        start_screen.style.display = 'none';
        game_screen.classList.add('active');
    };

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('start-button').onclick();
        }
    });

    document.getElementById('pause-button').onclick = function() {
        app.togglePause();
    };

    document.getElementById('manual').onclick = function() {
        click.play();
        start_screen.style.display = 'none';
        manual_screen.style.display = 'block';
    };

    document.getElementById('back-button-manual').onclick = function() {
        click.play();
        manual_screen.style.display = 'none';
        start_screen.style.display = 'flex';
    };

    document.getElementById('skins').onclick = function() {
        click.play(); 
        config_screen.style.display = 'none';
        skin_screen.style.display = 'block';
    };

    document.getElementById('back-button-skins').onclick = function() {
        click.play();
        skin_screen.style.display = 'none';
        config_screen.style.display = 'flex';
    };

    document.getElementById('back-button-game').onclick = function() {
        click.play();
        game_screen.style.display = 'none';
        start_screen.style.display = 'flex';
        app.resetGame(true);
    };

    const skinButtons = document.querySelectorAll('.choose-skin-button');

skinButtons.forEach(button => {
    button.onclick = function() {
        click.play();
        skinButtons.forEach(btn => btn.classList.remove('skin_selected'));
        
        button.classList.add('skin_selected');
        
        selectedSkin = button.getAttribute('data-skin');
        
        app.applySkin();
    };
});

    document.getElementById("config").addEventListener("click", function() {
        click.play();
        start_screen.style.display = "none";
        config_screen.style.display = "block";
    });

    document.getElementById("difficulty").addEventListener("click", function() {
        click.play();
        config_screen.style.display = "none";
        difficulty_screen.style.display = "block";
    });

    document.getElementById("volume").addEventListener("click", function() {
        click.play();
        config_screen.style.display = "none";
        volume_screen.style.display = "block";
    });

    document.getElementById("back-button-config").addEventListener("click", function() {
        click.play();
        config_screen.style.display = "none";
        start_screen.style.display = "block";
    });

    document.getElementById("back-button-dific").addEventListener("click", function() {
        click.play();
        difficulty_screen.style.display = "none";
        config_screen.style.display = "block";
    });

    document.getElementById("back-button-volume").addEventListener("click", function() {
        click.play();
        volume_screen.style.display = "none";
        config_screen.style.display = "block";
    });

    document.getElementById("easy-button").addEventListener("click", function() {
        click.play();
        setDifficulty("easy", app);
    });
    document.getElementById("normal-button").addEventListener("click", function() {
        click.play();
        setDifficulty("normal", app);
    });
    document.getElementById("hard-button").addEventListener("click", function() {
        click.play();
        setDifficulty("hard", app);
    });

    document.getElementById('creditos').onclick = function() {
        click.play();
        config_screen.style.display = 'none';
        creditos_screen.style.display = 'block';
    };
    
    const credit_buttons = document.querySelectorAll('.credit-button');
    credit_buttons.forEach(button => {
        button.addEventListener('click', function() {
            credit_buttons.forEach(button => button.classList.remove('credit_selected'));
            button.classList.add('credit_selected');
            document.querySelectorAll('.credit-information').forEach(info => info.classList.add('hidden'));
            const infoId = this.id.replace('-button', '');
            document.getElementById(infoId).classList.remove('hidden');
        });
    });

    document.getElementById('back-button-credit').onclick = function() {
        click.play();
        creditos_screen.style.display = 'none';
        config_screen.style.display = 'flex';
    };

    document.getElementById('winner_button').onclick = function() {
        click.play();
        game_screen.style.display = 'none';
        start_screen.style.display = 'flex';
        resetGame(true);
    };

    const toggleMusicButton = document.getElementById('toggle-music');
    let musicPlaying = true;

    toggleMusicButton.addEventListener('click', function() {
        click.play();
        if (musicPlaying) {
            fundo.pause(); 
            toggleMusicButton.innerText = "Música: Off"; 
        } else {
            fundo.play(); 
            toggleMusicButton.innerText = "Música: On"; 
        }
        musicPlaying = !musicPlaying; 
    });

    const toggleSoundEffectsButton = document.getElementById('toggle-sound-effects');
    let soundEnabled = true;

    toggleSoundEffectsButton.addEventListener('click', function() {
        click.play();
        if (soundEnabled) {
            malacaindo.muted = true;  
            toggleSoundEffectsButton.innerText = "Efeitos Sonoros: Off";  
        } else {
            malacaindo.muted = false;  
            toggleSoundEffectsButton.innerText = "Efeitos Sonoros: On";
        }
        soundEnabled = !soundEnabled;
    });

    document.getElementById("aumentar-volume").addEventListener("click", function() {
        click.play();
        if (fundo.volume < 1) fundo.volume += 0.1;
    });
    
    document.getElementById("diminuir-volume").addEventListener("click", function() {
        click.play();
        if (fundo.volume > 0) fundo.volume -= 0.1;
    });
    
}
function setDifficultyLevel(level, app) {
    if (level === "easy") {
        app.currentSpeed = 8;
    } else if (level === "normal") {
        app.currentSpeed = 3;
    } else if (level === "hard") {
        app.currentSpeed = 0.1;
    }
}

function setDifficulty(level, app) {
    localStorage.setItem('difficulty', level);

    const buttons = document.querySelectorAll('.dific-button');
    buttons.forEach(button => {
        if (button.id === `${level}-button`) {
            button.classList.add('dific_selected');
        } else {
            button.classList.remove('dific_selected');
        }
    });

    setDifficultyLevel(level, app);
}
