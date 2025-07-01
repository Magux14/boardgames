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
        probabilityToAppear: 0
    },
    {
        name: 'tubo',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 0,
            dices: 2,
            hit: 4,
            firePower: 1
        },
        probabilityToAppear: 15
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
        probabilityToAppear: 5
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
        probabilityToAppear: 22
    },
    {
        name: 'merc handgun',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 1,
            dices: 2,
            hit: 3,
            firePower: 1
        },
        probabilityToAppear: 7
    },
    {
        name: 'sti eagle 6.0',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 1,
            dices: 3,
            hit: 3,
            firePower: 1
        },
        probabilityToAppear: 4
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
        probabilityToAppear: 18
    },
    {
        name: 'escopeta western m37',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 1,
            dices: 3,
            hit: 3,
            firePower: 2
        },
        probabilityToAppear: 5
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
        probabilityToAppear: 15
    },
    {
        name: 'gatlin gun',
        type: 'weapon',
        weapon: {
            minRange: 0,
            maxRange: 2,
            dices: 5,
            hit: 3,
            firePower: 2
        },
        probabilityToAppear: 2
    },
    {
        name: 'molotov',
        type: 'weapon',
        desc: 'Al ser lanzada destruye a todo aquel que se encuentre en el area, no es necesario equiparla solo se descarta.',
        weapon: {
            minRange: 1,
            maxRange: 1,
            dices: 0,
            hit: 0,
            firePower: 3,
            notEquipable: true
        },
        probabilityToAppear: 7
    },
    {
        name: 'spray médico',
        type: 'health',
        recover: 2,
        probabilityToAppear: 2
    },
    {
        name: 'palanca',
        type: 'item',
        desc: 'Podrás abrir puertas rojas cerradas',
        probabilityToAppear: 8
    },
    {
        name: 'hierba verde',
        type: 'health',
        desc: 'Recupera 1 punto de vida.',
        recover: 1,
        probabilityToAppear: 4,
        lstToCombineItems: ['hierba roja', 'hierba verde']
    },
    {
        name: 'hierba roja',
        type: 'health',
        desc: 'Júntala con una "hierba verde" para recuperar 2 puntos de vida.',
        recover: 0,
        probabilityToAppear: 6,
        lstToCombineItems: ['hierba verde']
    },
    {
        name: 'llave stars',
        type: 'item',
        desc: 'Con esta llave puedes abrir la bodega de armas',
        probabilityToAppear: 4
    },
    {
        name: 'pólvora a',
        type: 'item',
        desc: 'Teniendo la "máquina de balas" puedes construir 10 balas de pistola',
        probabilityToAppear: 12,
        lstToCombineItems: ['pólvora a']
    },
    {
        name: 'pólvora b',
        type: 'item',
        desc: 'Teniendo la "máquina de balas" puedes construir 4 balas de "escopeta" o 20 de "rifle de asalto"',
        probabilityToAppear: 12,
        lstToCombineItems: ['pólvora b']
    },
    {
        name: 'tarjeta rpd',
        type: 'item',
        desc: 'Quien posea esta tarjeta podrá tener 1 acción extra en su turno (limitado a una tarjeta por jugador)',
        probabilityToAppear: 4
    },
    {
        name: 'máquina de balas',
        type: 'item',
        desc: 'Teniendo pólvora puedes construir balas',
        probabilityToAppear: 0
    },
    {
        name: 'frituras',
        type: 'item',
        desc: 'Puedes consumir las frituras sin gastar ninguna acción para ganar 1 acción extra.',
        probabilityToAppear: 7
    },
    {
        name: 'bebida energética',
        type: 'item',
        desc: 'tira un dado extra al atacar con un arma',
        probabilityToAppear: 7
    },
    {
        name: 'balas pistola',
        type: 'bullets',
        bulletsConfig: {
            type: 'gun',
            minQuantity: 3,
            maxQuantity: 10,
        },
        probabilityToAppear: 6
    },
    {
        name: 'balas escopeta',
        type: 'bullets',
        bulletsConfig: {
            type: 'shotgun',
            minQuantity: 2,
            maxQuantity: 5,
        },
        probabilityToAppear: 5
    },
    {
        name: 'balas ametralladora',
        type: 'bullets',
        bulletsConfig: {
            type: 'machinegun',
            minQuantity: 10,
            maxQuantity: 30,
        },
        probabilityToAppear: 5
    },
    {
        name: 'walkers',
        type: 'activation',
        probabilityToAppear: 5
    },
    {
        name: 'runners',
        type: 'activation',
        probabilityToAppear: 5
    },
    {
        name: 'boomers',
        type: 'activation',
        probabilityToAppear: 5
    },
    {
        name: 'némesis',
        type: 'activation',
        probabilityToAppear: 3
    }
]

export const lstResidentCombinedItems = [
    {
        name: 'mix hierbas verde x roja',
        type: 'health',
        desc: 'Combinación de hierba verde y roja, recupera 2 de vida',
        recover: 2,
        itemsToCombine: [
            'hierba verde',
            'hierba roja',
        ]
    },
    {
        name: 'mix hierbas verde x verde',
        type: 'health',
        desc: 'Combinación de hierba verde y verde, recupera 2 de vida',
        recover: 2,
        itemsToCombine: [
            'hierba verde',
            'hierba verde',
        ]
    },
    {
        name: 'pólvora aa',
        type: 'item',
        desc: 'Teniendo la "máquina de balas" puedes construir 25 balas de pistola',
        itemsToCombine: [
            'pólvora a',
            'pólvora a',
        ]
    },
    {
        name: 'pólvora bb',
        type: 'item',
        desc: 'Teniendo la "máquina de balas" puedes construir 10 balas de "escopeta" o 50 de "rifle de asalto"',
        itemsToCombine: [
            'pólvora b',
            'pólvora b',
        ]
    },
]

export const lstResidentZombies = [
    {
        name: 'walkers',
        desc: 'Los Walkers avanzan 1 espacio por turno, mueren de 1 bala',
        actions: 1,
        min: 1,
        max: 5,
        probabilityToAppear: 45
    },
    {
        name: 'runners',
        desc: 'Los Walkers avanzan 2 espacios por turno, mueren de 1 bala',
        actions: 2,
        min: 1,
        max: 4,
        probabilityToAppear: 35
    },
    {
        name: 'boomers',
        desc: 'Los Bruts avanzan 1 espacio por turno, mueren de un golpe con armas nivel 2',
        actions: 1,
        min: 1,
        max: 3,
        probabilityToAppear: 20
    }
]
