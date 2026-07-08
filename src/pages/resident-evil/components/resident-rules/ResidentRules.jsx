import './resident-rules.scss';
export const ResidentRules = () => {
    return (
        <div className="resident-rules__container">
            <div className="resident-rules__main-title">
                Reglas
            </div>
            <div className="resident-rules__title">
                Objetivo del juego
            </div>
            <div className="resident-rules__desc">
                Recuperar las 3 muestras del T-Virus y Salir con vida.
            </div>
            <div className="resident-rules__title">
                ¿Cómo jugar?
            </div>
            <div className="resident-rules__desc">
                La partida necesitará a un "Dungeon master", quien será encargado de seguir las reglas y activar los efectos correspondientes en el juego.
                <br />
                Cada ronda consta de 3 fases:
                <ol>
                    <li>Movimiento de jugadores</li>
                    <li>Fase de los zombies</li>
                    <li>Fase de resurrección</li>
                </ol>
                <div className="resident-rules__subtitle">
                    Movimiento de jugadores
                </div>
                Los jugadores tienen 4 acciones al iniciar su turno, cada acción puede ser una de las siguientes:
                <br />
                <ol>
                    <li>Moverse un espacio en el mapa</li>
                    <li>Mirar con cuidado otro cuarto sin entrar para ver que hay dentro</li>
                    <li>Disparar</li>
                    <li>Buscar un item (esto solo se puede hacer una vez por turno)</li>
                    <li>Entregar un item a un compañero (tienen que estar en el mismo cuarto)</li>
                </ol>
                Cosas que no se cuenta como una acción:
                <ol>
                    <li>Lanzar una botella</li>
                    <li>Cambiar de arma</li>
                    <li>Combinar armas</li>
                </ol>
                <div className="resident-rules__subtitle">
                    Fase de los zombies
                </div>
                Los zombies se mueven en automático por linea de visión dando prioridad al jugador más cercano.
                <br />
                Ver sección "Zombies" para saber su rango de movimiento.
                <br />
                Si un zombie te ataca, después de recibir el daño, podrás empujarlo a un cuarto adyacente al tuyo (con excepción de nemesis y los boomers), con esto igual podrás descubrir nuevas zonas.
                <br />
                <br />
                <div className="resident-rules__subtitle">
                    Fase de resurrección
                </div>
                por cada habitación que tenga un cuervo o un toro se utilizará el botón de resurrección y se pondrá al o a los zombies indicados en la app
            </div>
            <div className="resident-rules__title">
                Armas
            </div>
            <div className="resident-rules__subtitle">
                En general
            </div>
            <div className="resident-rules__desc">
                Cada arma tiene un número de dados a tirar y el daño que hacen, al menos un dado tiene que sacar el número mímimo de golpe para poder acertar, solo es un golpe por tirada de dados (excepto la ametralladora).
                <br />
                Las armas pueden combinarse para tener mayores efectos.
                <br />
                <br />

                <div className="resident-rules__subtitle">
                    Stats de las Armas
                </div>
                En orden las armas tienen estos stats:
                <ol>
                    <li>Alcance en distancia entre habitaciones</li>
                    <li>Dados utilizados para el ataque</li>
                    <li>Resultado mínimo requerido en el dado para acertar</li>
                    <li>Resultado mínimo requerido en el dado para dar un critico (daño se multiplica)</li>
                    <li>Daño</li>
                </ol>

            </div>
            <div className="resident-rules__subtitle">
                Ametralladora
            </div>
            <div className="resident-rules__desc">
                Las ametralladoras son las únicas armas en las que cada dado que acierto hace un daño
            </div>

            <div className="resident-rules__title">
                Zombies
            </div>

            <div className="resident-rules__desc">
                Los zombies tienen diferente número de vida
                <br />
                Walkers: 2 de vida
                <br />
                Runners: 2 de vida
                <br />
                Bommers: 3 de vida
                <br />
                Némesis: Inmortal (con 5 de daño puedes inhabilitarlo temporalmente hasta que se vuelva a activar)
            </div>

            <div className="resident-rules__title">
                Aparición de zombies
            </div>
            <div className="resident-rules__desc">
                Cada que se abras una puerta y haya una ficha de aparición de zombies,  en todas las zonas oscuras deberás colocar zombies dependiendo de lo que aparezca en el generador de zombies
            </div>

            <div className="resident-rules__title">
                Fase de zombies
            </div>

            <div className="resident-rules__desc">
                Todos los zombies se moverán su respectivo número de posiciones, moviéndose siempre al jugador por el camino más corto posible
                <br />
                Walkers: 1 posición
                <br />
                Runners: 2 posiciones
                <br />
                Boomers: 1 posición
                <br />
                Némesis: 1 posición
                <br />
            </div>

            <div className="resident-rules__title">
                Némesis
            </div>
            <div className="resident-rules__desc">
                Cada que te golpe némesis perderá 1 de vida, también serása empujado a la dirección contraría a la que Némesis esté, si hay pared serás empujado a la siguiente ubicación disponible
            </div>

            <div className="resident-rules__title">
                Esquivar
            </div>
            <div className="resident-rules__desc">
                Si estás junto a un zombie en la misma zona y quieres moverte tirarás los dados para poder evadirlo, si hay más de uno cada valor se sumará +1 por cada zombie que haya en la misma zona, si no logras tirar lo requirido el zombie te hara daño
                <br />
                Walkers: al menos 3 en el dado
                <br />
                Runners: al menos 4 en el dado
                <br />
                Boomers: al menos 4 en el dado
                <br />
                Némesis: al menos 5 en el dado
                <br />
                <br />
                Ejemplo: si estás junto a un walker y un runner, deberás sacar 4 y 5 respectivamente (3 del walker + 1 por que hay otro zombie y 4 del runner + 1 porque hay otro zombie, 4 y 5)
            </div>
        </div>
    )
}
