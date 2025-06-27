export const lstResidentItems = [
    {
        name: 'cuchillo',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 0,
            dices: 1,
            hit: 4,
            firePower: 1
        },
        quantitytoSpawn: 0
    },
    {
        name: 'hot dogger',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 0,
            dices: 2,
            hit: 3,
            firePower: 2
        },
        quantitytoSpawn: 1
    },
    {
        name: 'pistola g19',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 1,
            dices: 1,
            hit: 3,
            firePower: 1,
        },
        quantitytoSpawn: 1
    },
    {
        name: 'escopeta',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 1,
            dices: 2,
            hit: 3,
            firePower: 2
        },
        quantitytoSpawn: 1
    },
    {
        name: 'rifle de asalto',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 2,
            dices: 5,
            hit: 4,
            firePower: 1
        },
        quantitytoSpawn: 1
    },
    {
        name: 'molotov',
        type: 'weapon',
        weapon: {
            minRange: 1,
            maxRange: 1,
            dices: 0,
            hit: 0,
            firePower: 3
        },
        quantitytoSpawn: 1
    },
    {
        name: 'spray médico',
        type: 'health',
        recover: 2,
        quantitytoSpawn: 1
    },
    {
        name: 'palanca',
        type: 'item',
        desc: 'Podrás abrir puertas rojas cerradas',
        quantitytoSpawn: 1
    },
    {
        name: 'hierba verde',
        type: 'health',
        desc: 'Recupera 1 punto de vida.',
        recover: 1,
        quantitytoSpawn: 1
    },
    {
        name: 'hierba roja',
        type: 'health',
        desc: 'Júntala con una "hierba verde" para recuperar 2 puntos de vida.',
        recover: 0,
        quantitytoSpawn: 1
    },
    {
        name: 'llave stars',
        type: 'item',
        desc: 'Con esta llave puedes abrir la bodega de armas',
        quantitytoSpawn: 1
    },
    {
        name: 'pólvora a',
        type: 'item',
        desc: 'Teniendo la "máquina de balas" puedes construir 10 balas de pistola',
        quantitytoSpawn: 1
    },
    {
        name: 'pólvora b',
        type: 'item',
        desc: 'Teniendo la "máquina de balas" puedes construir 4 balas de "escopeta" o 20 de "rifle de asalto"',
        quantitytoSpawn: 1
    },
    {
        name: 'tarjeta rpd',
        type: 'item',
        desc: 'Quien posea esta tarjeta podrá tener 1 acción extra en su turno',
        quantitytoSpawn: 1
    },
    {
        name: 'máquina de balas',
        type: 'item',
        desc: 'Teniendo pólvora puedes construir balas',
        quantitytoSpawn: 1
    },
    {
        name: 'frituras',
        type: 'item',
        desc: 'Puedes consumir las frituras sin gastar ninguna acción para ganar 1 acción extra.',
        quantitytoSpawn: 1
    },
    {
        name: 'Activación caminantes',
        type: 'activation',
        quantitytoSpawn: 3
    },
    {
        name: 'Activación corredores',
        type: 'activation',
        quantitytoSpawn: 3
    },
    {
        name: 'Activación brutos',
        type: 'activation',
        quantitytoSpawn: 3
    },
    {
        name: 'balas pistola',
        type: 'bullets',
        bulletConfig: {
            type: 'gun',
            minQuantity: 3,
            maxQuantity: 10,
        },
        quantitytoSpawn: 3
    },
    {
        name: 'balas escopeta',
        type: 'bullets',
        bulletConfig: {
            type: 'shotgun',
            minQuantity: 2,
            maxQuantity: 5,
        },
        quantitytoSpawn: 3
    },
    {
        name: 'balas ametralladora',
        type: 'bullets',
        bulletConfig: {
            type: 'machinegun',
            minQuantity: 10,
            maxQuantity: 30,
        },
        quantitytoSpawn: 3
    }
]