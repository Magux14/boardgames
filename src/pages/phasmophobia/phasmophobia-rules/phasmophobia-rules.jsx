import './phasmophobia-rules.scss';

export const PhasmophobiaRules = () => {
    return (
        <div className="phasmophobia-rules__container">

            <h4>Objetivo</h4>
            <p>
                Encontrar qué tipo de fantasma se encuentra en la casa, anotan las pruebas en la sección "pruebas" y no se te olvide salir de la casa con vida
            </p>

            <h4>Reglas</h4>

            <ol>
                <li>
                    Prepara el servidor de juego (utiliza una tablet de preferencia), aquí se manejará los stacks del fantasma y se podrán relizar las pruebas
                </li>
                <li>
                    Prepara el juego
                    <ol type="i">
                        <li>
                            Arma la casa coloca los cuartos y pasillos como desees siempre y cuando estén conectados entre si.
                        </li>
                        <li>
                            Coloca un foco en cada cuarto del lado "apagado".
                        </li>
                        <li>
                            Situa el switch principal de luz del lado "apagado"en un cuarto de tu elección.
                        </li>
                        <li>
                            Revuelve y situa boca abajo los token de prueba a lo largo del mapa al fondo de los cuartos y pasillos.
                        </li>
                        <li>
                            Reparte las cartas de herramientas de prueba (cartas azules)
                            <p>
                                1 jugador: 4 herramientas
                            </p>
                            <p>
                                2 jugadores: 3 herramientas
                            </p>
                            <p>
                                3-5 jugadores: 2 herramientas
                            </p>
                        </li>
                    </ol>
                </li>
                <li>
                    Cada jugador comienza con 15 de cordura, si llega a 0 el jugador muere
                </li>
                <li>
                    Todos son un equipo, exploren la casa en busca de tokens de prueba, solo podrás hacer la prueba si cuentas con la herramienta adecuada (la figura tiene que ser la misma que tu carta)
                </li>
                <li>
                    El dado numerado muestra cuantas acciones tienes disponibles en tu turno, cada acción corresponde a las siguientes:
                    <ol type="i">
                        <li>
                            Moverte un espacio
                        </li>
                        <li>
                            Realizar una prueba
                        </li>
                        <li>
                            Prender el switch principal de luz
                        </li>
                        <li>
                            Prender la luz (si el switch principal de luz está encendido)
                        </li>
                    </ol>
                </li>
                <li>
                    Anota quien es el primer jugador ya que esto determinará que cuando pase el último jugador de la ronda, se inicie la fase de cordura (todos los jugadores que estén en un cuarto con la luz apagada pierden 1 de cordura)
                </li>
            </ol>

            <h4>¿Que hacer en tu turno?</h4>
            <ol>
                <li>
                    Tirar los 2 dados
                </li>
                <li>
                    Resolver evento del dado maldito
                </li>
                <li>
                    Realizar el número de acciones (indicada por los dados, puedes omitir número de acciones si así lo deseas)
                </li>
                <li>
                    Tomar carta del mazo maldito (solo si estás fuera del camión) y resolver su efecto (hay cartas que puedes conservar y utilizar cuando más te convenga)
                </li>
                <li>
                    En caso de ser el último jguador de la ronda empieza fase de cordura (todos los jugadores que estén en un cuarto con la luz apagada pierden 1 de cordura)
                </li>
            </ol>

              <h4>Dado Maldito</h4>
            <div>
                <div className="phasmophobia-rules__dice-example-container"> 
                   <img src={`./img/phasmophobia/dice/cordura.png`} className="phasmophobia-rules__dice-example" alt="codura +1"/>
                   <div>+1 de cordura</div>
                </div>
                 <div className="phasmophobia-rules__dice-example-container"> 
                   <img src={`./img/phasmophobia/dice/energia-maldita-1.png`} className="phasmophobia-rules__dice-example" alt="codura +1"/>
                   <div>+1 stack maldito</div>
                </div>
                 <div className="phasmophobia-rules__dice-example-container"> 
                   <img src={`./img/phasmophobia/dice/energia-maldita-2.png`} className="phasmophobia-rules__dice-example" alt="codura +1"/>
                   <div>+2 stacks malditos</div>
                </div>
                 <div className="phasmophobia-rules__dice-example-container"> 
                   <img src={`./img/phasmophobia/dice/energia-maldita-3.png`} className="phasmophobia-rules__dice-example" alt="codura +1"/>
                   <div>+3 stacks malditos</div>
                </div>
                 <div className="phasmophobia-rules__dice-example-container"> 
                   <img src={`./img/phasmophobia/dice/foco.png`} className="phasmophobia-rules__dice-example" alt="codura +1"/>
                   <div>Se revienta el foco del cuarto donde se está (queda fuera de juego para toda la partida)</div>
                </div>
                
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
