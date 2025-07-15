import './resident-rules.scss';
export const ResidentRules = () => {
    return (
        <div className="resident-rules__container">
            <div className="resident-rules__main-title">
                Reglas
            </div>
            <div className="resident-rules__title">
                Armas
            </div>
            <div className="resident-rules__subtitle">
                En general
            </div>
            <div className="resident-rules__desc">
                Cada arma tiene un número de dados a tirar y el daño que hacen, al menos un dado tiene que sacar el número mímimo de golpe para poder acertar, solo es un golpe por tirada de dados (excepto la ametralladora)
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
                Némsis: Inmortal (con 5 de daño puedes inhabilitarlo temporalmente hasta que se vuelva a activar)
                <br />
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
                <br />
                Depués del movimiento, en cada zona contectada por una puerta abierta, por cada habitación oscura se tirará un dado + un dado extra (ejemplo: 5 zonas oscuras = 6 dados)
                por cada dado donde se saque 6 un zombie nuevo aparecerá en la zona más alejada de cada jugador si esto ocurre Némesis también se activará
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
