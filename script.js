const btnStart = document.querySelector(".game-btn")
const welcomeScreen = document.querySelector(".welcome__screen")
const gameScreen = document.querySelector(".main")
const wave = document.querySelector(".wave-wrapper")

const inputDeadpool = document.querySelector (".health__input--Deadpool")
const inputWolverine = document.querySelector(".health__input--Wolverine")

let heroHealthDeadpool = document.querySelector(".hero__health--Deadpool")
let heroHealthWolverine = document.querySelector(".hero__health--Wolverine")

const fightText = document.querySelector(".fight__text")
const turnText = document.querySelector(".turn__text")
const battleText = document.querySelector(".battle__paragraph")

/*Animaciones*/
const deadpoolStand = document.querySelector(".deadpool__stand")
const deadpoolAttack = document.querySelector(".deadpool__attack")
const deadpoolRun = document.querySelector(".deadpool__run")
const deadpoolHurt = document.querySelector(".deadpool__hurt")
const deadpoolDead = document.querySelector(".deadpool__dead")
const deadpoolContainer = document.querySelector(".sprite__container--deadpool")

const wolverineStand = document.querySelector(".wolverine__stand")
const wolverineAttack = document.querySelector(".wolverine__attack")
const wolverineRun = document.querySelector(".wolverine__run")
const wolverineHurt = document.querySelector(".wolverine__hurt")
const wolverineDead = document.querySelector(".wolverine__dead")
const wolverineContainer = document.querySelector(".sprite__container--wolverine")


/*********/

btnStart.addEventListener("click", function() {
  wave.style.display = "none";
  welcomeScreen.style.opacity = "0";
  
  setTimeout(function() { /*Funcion anónima*/
    welcomeScreen.style.display = "none";
    gameScreen.style.display = "block";
    
    setTimeout(() => { /*Función de flecha*/
      gameScreen.style.opacity = '1';
      fightText.style.display = "block";

      // Retraso adicional antes de iniciar la batalla
      setTimeout(() => {
        let deadpoolInput = inputDeadpool.value;
        let wolverineInput = inputWolverine.value;

        const numerosInput = /^\d+$/;

        if (!numerosInput.test(deadpoolInput)) {
          alert("Please enter a valid number for Deadpool");
          return;
        }
        if (!numerosInput.test(wolverineInput)) {
          alert("Please enter a valid number for Wolverine");
          return;
        }

        let deadpoolHealth = parseInt(deadpoolInput);
        let wolverineHealth = parseInt(wolverineInput);

        heroHealthDeadpool.textContent = deadpoolHealth;
        heroHealthWolverine.textContent = wolverineHealth;
        
        setTimeout(() => {
          fightText.style.opacity = "0"
        
        batalla(deadpoolHealth, wolverineHealth); // Inicia la batalla aquí
      }, 500)
      }, 3000); // Retraso de 2 segundos antes de iniciar la batalla
    }, 50); // Pausa pequeña para completar la transición visual
  }, 1000); // Tiempo de espera de 1 segundo para que la pantalla desaparezca
});


function mostrarTurno(personaje) {
    if (personaje === 'deadpool') {
        document.getElementById('deadpoolTurnIcon').style.display = 'block';
        document.getElementById('wolverineTurnIcon').style.display = 'none';
    } else if (personaje === 'wolverine') {
        document.getElementById('deadpoolTurnIcon').style.display = 'none';
        document.getElementById('wolverineTurnIcon').style.display = 'block';
    } return function ocultarIcono () {
      if (personaje === 'deadpool') {
            document.getElementById('deadpoolTurnIcon').style.display = 'none';
        } else if (personaje === 'wolverine') {
            document.getElementById('wolverineTurnIcon').style.display = 'none';
        }
    }
}

function generarRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function esperarAnimacion(elemento, evento = 'animationend') {
  return new Promise(resolve => {
    elemento.addEventListener(evento, resolve, { once: true });
  });
}
 
function reiniciarAnimacion(elemento) {
  elemento.style.animation = "none"; // Elimina la animación actual
  void elemento.offsetWidth; // Recalcula estilos para reiniciar
  elemento.style.animation = ""; // Reaplica la animación definida en CSS
}

async function batalla(deadpoolHealth, wolverineHealth) {
    let turn = 1;
    let deadpoolSaltaTurno = false;
    let wolverineSaltaTurno = false;

    while (deadpoolHealth > 0 && wolverineHealth > 0) {
        // Mostrar el turno
        turnText.textContent = `Turn ${turn}`;
        const ocultarTurnoDeadpool = mostrarTurno("deadpool");
        

        // Texto de inicio del turno de Deadpool
        reiniciarAnimacion(battleText);
        battleText.textContent = "It's Deadpool's turn";
        await esperarAnimacion(battleText);

        // Pausa para que el usuario lea el mensaje
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        

        // Acciones del turno de Deadpool
        if (!deadpoolSaltaTurno) {
            if (Math.random() > 0.25) {
                let ataqueDeadpool = generarRandom(10, 100);
                
                // Texto de ataque
                reiniciarAnimacion(battleText);
                battleText.textContent = `Deadpool attacks Wolverine for ${ataqueDeadpool} damage`;
                await esperarAnimacion(battleText);
                ocultarTurnoDeadpool()
                // Pausa antes de iniciar animaciones
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Animación de Deadpool corriendo
                deadpoolStand.style.display = "none";
                deadpoolRun.style.display = "block";
                await esperarAnimacion(deadpoolRun);

                // Pausa breve antes de cambiar a ataque
                await new Promise(resolve => setTimeout(resolve, 300));

                // Animación de ataque
                deadpoolRun.style.display = "none";
                deadpoolAttack.style.display = "block";
                await new Promise(resolve => setTimeout(resolve, 500));

                // Animación de daño en Wolverine
                wolverineStand.style.display = "none";
                wolverineHurt.style.display = "block";
                await esperarAnimacion(wolverineHurt);
                wolverineHurt.style.display = "none"
                wolverineDead.style.display = "block"
                await new Promise(resolve => setTimeout(resolve, 1000))
                // Volver al estado inicial
                deadpoolAttack.style.display = "none";
                deadpoolStand.style.display = "block";
                wolverineDead.style.display = "none";
                wolverineStand.style.display = "block";

                // Ajuste de la salud
                wolverineHealth -= ataqueDeadpool;
                if (wolverineHealth <= 0) {
                  wolverineHealth = 0;
              }

                // Evento especial si el ataque fue máximo
                if (ataqueDeadpool === 100) {
                    reiniciarAnimacion(battleText);
                    battleText.textContent = "Wolverine is severely injured and cannot attack on the next turn";

                    await esperarAnimacion(battleText);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    wolverineSaltaTurno = true;
                }
            } else {
                // Mensaje de esquivar
                reiniciarAnimacion(battleText);
                battleText.textContent = "Wolverine dodges Deadpool's attack";
                await esperarAnimacion(battleText);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } else {
            // Mensaje de recuperación
            reiniciarAnimacion(battleText);
            battleText.textContent = "Deadpool recovers and skips his turn";
            await esperarAnimacion(battleText);
            await new Promise(resolve => setTimeout(resolve, 1000));
            deadpoolSaltaTurno = false;
        }

        // Verificar si Wolverine pierde
        if (wolverineHealth <= 0) {
            wolverineHealth = 0
            wolverineStand.style.display = "none";
            wolverineHurt.style.display = "none";
            wolverineDead.style.display = "block";
          
            
            reiniciarAnimacion(battleText);
            battleText.textContent = "Deadpool wins";
            await esperarAnimacion(battleText);
            break;
        }

        // Turno de Wolverine
        const ocultarTurnoWolverine = mostrarTurno("wolverine");
        reiniciarAnimacion(battleText);
        battleText.textContent = "It's Wolverine's turn";
        await esperarAnimacion(battleText);

        // Pausa para leer
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (!wolverineSaltaTurno) {
            if (Math.random() > 0.20) {
                let ataqueWolverine = generarRandom(10, 120);

                // Mensaje de ataque
                reiniciarAnimacion(battleText);
                battleText.textContent = `Wolverine attacks Deadpool for ${ataqueWolverine} damage`;
                await esperarAnimacion(battleText);
                ocultarTurnoWolverine()

                // Pausa antes de animaciones
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Animación de Wolverine corriendo
                wolverineStand.style.display = "none";
                wolverineRun.style.display = "block";
                await esperarAnimacion(wolverineRun);

                // Breve pausa antes del ataque
                await new Promise(resolve => setTimeout(resolve, 300));

                // Animación de ataque
                wolverineRun.style.display = "none";
                wolverineAttack.style.display = "block";
                await new Promise(resolve => setTimeout(resolve, 500));

                // Animación de daño en Deadpool
                deadpoolStand.style.display = "none";
                deadpoolHurt.style.display = "block";
                await esperarAnimacion(deadpoolHurt);
                deadpoolHurt.style.display = "none"
                deadpoolDead.style.display = "block"
                await new Promise(resolve => setTimeout(resolve, 1000))


                // Volver al estado inicial
                wolverineAttack.style.display = "none";
                wolverineStand.style.display = "block";
                deadpoolDead.style.display = "none";
                deadpoolStand.style.display = "block";

                // Ajuste de la salud
                deadpoolHealth -= ataqueWolverine;
                if (deadpoolHealth <= 0) {
                  deadpoolHealth = 0;
              }

                // Evento especial si el ataque fue máximo
                if (ataqueWolverine === 120) {
                    reiniciarAnimacion(battleText);
                    battleText.textContent = "Deadpool is severely injured and cannot attack on the next turn";
                    await esperarAnimacion(battleText);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    deadpoolSaltaTurno = true;
                }
            } else {
                // Mensaje de esquivar
                reiniciarAnimacion(battleText);
                battleText.textContent = "Deadpool dodges Deadpool's attack";
                await esperarAnimacion(battleText);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } else {
            // Mensaje de recuperación
            reiniciarAnimacion(battleText);
            battleText.textContent = "Wolverine recovers and skips his turn";
            await esperarAnimacion(battleText);
            await new Promise(resolve => setTimeout(resolve, 1000));
            wolverineSaltaTurno = false;
        }

        // Verificar si Deadpool pierde
        if (deadpoolHealth <= 0) {
            deadpoolHealth = 0
            deadpoolStand.style.display = "none";
            deadpoolHurt.style.display = "none";
            deadpoolDead.style.display = "block";


            reiniciarAnimacion(battleText);
            battleText.textContent = "Wolverine wins";
            await esperarAnimacion(battleText);
            break;
        }

        // Actualizar la vida de los héroes
        heroHealthDeadpool.textContent = deadpoolHealth;
        heroHealthWolverine.textContent = wolverineHealth;

        // Pausa entre turnos
        turn++;
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}
