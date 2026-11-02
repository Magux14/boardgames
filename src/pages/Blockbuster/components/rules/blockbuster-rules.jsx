
export const BlockbusterRules = () => {

    const chatGPTPromt = `
Actúa como árbitro de un juego. Verifica si el siguiente objeto o personaje aparece visiblemente en pantalla en la película indicada.

Película: [PELÍCULA]
Elemento: [OBJETO O PERSONAJE]

Responde:

Veredicto: Sí, No o No verificable.
Escena exacta: Describe cuándo, dónde y cómo aparece.
Minuto aproximado: Solo si es verificable.
Evidencia: Fuente que respalde la respuesta.
Imagen: Si es posible agrega una imagen que respalde la aparición del objeto o personaje en la película.
Reglas: No cuentan menciones en diálogos, suposiciones ni otras películas de la saga. Investiga si es necesario. No inventes escenas ni afirmes que algo no aparece sin evidencia suficiente.
`

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('text copiado en portapapeles');
    }

    return (
        <div className="blockbuster-rules__container">
            <h3>
                Objetivo
            </h3>
            <p>
                El objetivo del juego es conseguir 25 puntos adivinando películas a través de:
            </p>
            <ul>
                <li>Descipción</li>
                <li>Mímica</li>
                <li>Una sola palabra</li>
            </ul>
            <p>
                El juego consta de 2 fases:
            </p>
            <ul>
                <li>Cara a cara</li>
                <li>Adivina la película</li>
            </ul>

            <h3>
                Cara a cara
            </h3>
            <p>
                El objetivo de esta ronda es decir una película donde haya "x" objeto siempre que sea tu turno, quien no lo haga dentro del tiempo, perderá la ronda (esto no otorga ningún punto).
            </p>
            <ol>
                <li>
                    Ambos equipos seleccionan a un integrante de su equipo (cada lider se parará delante del celular).
                </li>
                <li>
                    El moreador seleccionará la opción "Cara a cara", aparecerá una frase: "películas donde hay: (alguna cosa)", el moderador deberá leerla en voz alta
                </li>
                <li>
                    Cada jugador debe de decir una película donde exista ese objeto (Intenta ser el primero), después de decir la película deberás presionar el botón del contador
                </li>
                <li>
                    El lider contrario (el que no presionó el botón primero) tendrá 15 segundos para decir otra película (diferentes a las anteriores ya mencionadas) donde exista ese objeto
                </li>
                <li>
                    Esta dinámica serguirá hasta que un líder no pueda decir una película dentro del tiempo, entonces perderá el "cara a cara"
                </li>
                <li>
                    Los compañeros de equipo podrán ayudar a su lider solamente con mímimca (está prohibido hablar o emitir sonidos)
                </li>
                <li>
                    Si tu contrincante dice una película y tu sabes que ese objeto no estuvo en dicha película tienes que decir "no te creo" (Solo el líder puede decirlo), esto activará un mecanismo especial donde se detiene el contador y se revisa la validez de la película mencionada.
                </li>
            </ol>
            <p>
                Por ejemplo:
            </p>
            <p>
                Películas donde hay "extraterrestres"
            </p>
            <p>
                A (fue la persona a quien se le ocurrió primero una película): E.T. (presiona botón)
            </p>
            <p>
                B: Señales (presiona botón)
            </p>
            <p>
                A: Hombres de Negro (presiona botón)
            </p>
            <p>
                a "B" no se le ocurre ninguna otra película y se le termina el tiempo, perdió el "cara a cara"
            </p>

            <h4>Resolución de conflictos (Para intensos)</h4>

            <ol>
                <li>
                    Las reglas y los tiempos de este manual deben seguirse al pie de la letra, no puede haber consensos por parte de los demás integrantes del juego.
                    El moderador tiene la autoridad final para resolver cualquier disputa o conflicto que surja durante el juego guíandose primero de este reglamento y en caso de que algo no esté especifícado será bajo su consideración
                </li>
                <li>
                    Primero se dice la película y luego se presiona el botón
                </li>
                <li>
                    El objeto mencionado debe estar presente en la película (visible o presente en caso de objetos invisibles), no se vale suponer que está ahí porque "es lógico" de lo contrario no será válida.
                </li>
                <li>
                    Hay que ser específico en la película mencionada, se da la opción de ser flexible en secuelas, solo bastará con decir el título de la película + el número de la secuela
                </li>
                <li>
                    Las películas puedes ser mecionandas en cualquier idioma
                </li>
                <li>
                    No se puede repetir el nombre de las películas ya mencionadas (aunque sea en otro idioma), se agrupará cada película por "sagas" esto es que si se mencionó un película perteneciente a una saga, no se podrá mencionar otra película de la misma saga o historias derivadas. por ejemplo:
                    <p>
                        Star wars 2
                    </p>
                    <p>
                        Todas las otras películas de star wars ahora no podrán ser mencionadas incluyendo historias derivadas (Star Wars 1, Star Wars 3, Rouge One, etc)
                    </p>
                </li>
                <li>
                    En caso de crossovers entre sagas, NO se invalidarán las sagas involucradas, por ejemplo:
                    <p>
                        Freddy vs Jason (crossover entre las sagas de Freddy Krueger y Jason Voorhees)
                    </p>
                    <p>
                        "Viernes 13" y "Pesadilla en la calle el infierno" seguirán siendo válidas
                    </p>
                </li>
                <li>
                    <p>
                        Si se activa el mecanismo de "no te creo", se revisará la película mencionada. la palabra clave es "No te creo", si de dice alguna otra cosa como "no lo se", "no me convence" o algo diferente NO se activará este mecanismo.
                        Para verificar esto primero se preguntará al resto de los jugadores, los cuales deben de ser honestos al respecto, si no se llega a una resolución se utilizará el siguiente prompt en chatGPT (haz click sobre el texto para copiar):
                    </p>
                    <code style={{ background: '#f0f0f0', boxDecorationBreak: 'clone', padding: '5px' }} onClick={() => copyToClipboard(chatGPTPromt)}>
                        {chatGPTPromt}
                    </code>
                    <p>
                        La resolución de este prompt será la final aún así chatgpt esté equivocado (trata de poner el nombre específico de la película si estás muy seguro, verificar cada película está muy difícil y se perdería el propósito del juego)
                    </p>
                </li>
            </ol>

            <h3>
                Adivina la película
            </h3>
            <p>
                El objetivo de esta fase que tu equipo adivine las 3 películas seleccionadas haciendo para cada una descripción, mímica y una sola palabra.

            </p>
            <p>
                por cada película adivinada el equipo ganará un punto.
            </p>

            <ol>
                <li>
                    El ganador del cara a cara seleccionará 3 películas de las 6 mostradas (las que salieron salieron, no se puede seleccionar de nuevo).
                </li>
                <li>
                    El Líder tendrá un minutos para que su equipo adivine las películas.
                </li>
                <li>
                    El líder deberá decir que tipo de pista dará (descripción, mímica o una sola palabra) antes de interpretar la pista.
                </li>
                <li>
                    Cuando el equipo adivine la película NO se deberá detener el cronómetro por ninguna razón a menos que el equipo haya adivinado las 3 películas y le sobre tiempo al equipo, este tiempo se utilizará para el robo de puntos.
                </li>
                <li>
                    El robo de puntos solo se activará si el equipo conisgue 3 puntos durante esa ronda.
                </li>
                <li>
                    En caso de robo de puntos el equipo tendrá el tiempo sobrante para intentar adivinar las películas del otro equipo y podrá utilizar de nuevo los 3 tipos de pistas (descripción, mímica o una sola palabra) y solo contará con las películas que el otro equipo NO adivino.
                </li>
            </ol>

            <h4>Resolución de conflictos (Para intensos)</h4>
            <ol>
                <li>
                    Cada película solo debe ocupar un tipo de pista (no se puede repetir)
                </li>
                <li>
                    No se puede mencionar nada que esté en el título de la película (con excepción de artículos como "el", "la", "los", "las" y esto con intención de comunicación general no para completar el título de la película)
                </li>
                <li>
                    No se puede decir el título de la película en otro idioma como método de ayuda
                </li>
                <li>
                    En caso de que el lider repitar un tipo de pista para una película, se invalidará tanto le película como el punto correspondiente.
                    Ejemplo: Si el líder da una descripción para la película "Titanic" y luego intenta dice más de una palabra para otra película, esa película y el punto correspondiente serán invalidados.
                </li>
            </ol>
        </div>
    )
}
