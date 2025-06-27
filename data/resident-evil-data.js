export const lstResidentItems = [
    {
        name: 'cuchillo',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 0,
            firePower: 1,
            dices: 1,
            hit: 4
        },
        quantitytoSpawn: 0
    },
    {
        name: 'cuchillo de combate',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 0,
            firePower: 2,
            dices: 2,
            hit: 3
        },
        quantitytoSpawn: 1
    },
    {
        name: 'pistola g19',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 1,
            firePower: 1,
            dices: 1,
            hit: 3
        },
        quantitytoSpawn: 1
    },
    {
        name: 'escopeta',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 1,
            firePower: 2,
            dices: 2,
            hit: 3
        },
        quantitytoSpawn: 1
    },
    {
        name: 'ametralladora',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 1,
            firePower: 1,
            dices: 5,
            hit: 4
        },
        quantitytoSpawn: 1
    },
    {
        name: 'spray curativo',
        type: 'health',
        recover: 2,
        quantitytoSpawn: 1
    },
    {
        name: 'hierva verde',
        type: 'health',
        recover: 2,
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
    },
    {
        name: 'nada',
        type: 'item',
        quantitytoSpawn: 10
    },
]