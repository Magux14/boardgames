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
        probabilityToAppear: 5,
        lstToCombineItems: ['cuchillo']
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
        probabilityToAppear: 12
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
        probabilityToAppear: 18
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
        probabilityToAppear: 3
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
        probabilityToAppear: 14
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
            hit: 5,
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
            hit: 4,
            firePower: 2
        },
        probabilityToAppear: 2
    },
    {
        name: 'rifle francotirador',
        desc: 'Este rifle tiene daño perforante, esto quiere decir que atravieza enemigos, si un enemigo cruza la linea de visión también recibirá el impacto',
        type: 'weapon',
        weapon: {
            minRange: 1,
            maxRange: 3,
            dices: 1,
            hit: 2,
            firePower: 1
        },
        probabilityToAppear: 2
    },
    {
        name: 'molotov',
        type: 'weapon',
        desc: 'Al ser lanzada destruye a todo aquel que se encuentre en el área, no es necesario equiparla solo se descarta.',
        weapon: {
            minRange: 1,
            maxRange: 1,
            dices: 0,
            hit: 0,
            firePower: 3,
            notEquipable: true
        },
        probabilityToAppear: 7,
        instantUse: true
    },
    {
        name: 'granada de luz',
        type: 'weapon',
        desc: 'Al ser lanzada todos los zombies en el área quedarán "atontados" y podrás pasar por esa área sin tener que pagar 1 acción extra por cada zombie en el área.',
        weapon: {
            minRange: 1,
            maxRange: 1,
            dices: 0,
            hit: 0,
            firePower: 0,
            notEquipable: true
        },
        probabilityToAppear: 7,
        instantUse: true
    },
    {
        name: 'spray médico',
        type: 'health',
        desc: 'Recupera 2 puntos de vida.',
        recover: 3,
        probabilityToAppear: 2
    },
    {
        name: 'hierba verde',
        type: 'health',
        desc: 'Recupera 1 punto de vida.',
        recover: 1,
        probabilityToAppear: 8,
        lstToCombineItems: ['hierba roja', 'hierba verde']
    },
    {
        name: 'hierba roja',
        type: 'health',
        desc: 'Júntala con una "hierba verde" para recuperar 2 puntos de vida.',
        recover: 0,
        probabilityToAppear: 5,
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
        type: 'bulletsCreation',
        desc: 'Teniendo la "máquina de balas" puedes construir 10 balas de pistola',
        probabilityToAppear: 5,
        lstToCombineItems: ['pólvora a'],
        bulletsCreation: {
            amount: 10,
            type: 'gunBullets'
        }
    },
    {
        name: 'pólvora b',
        type: 'bulletsCreation',
        desc: 'Teniendo la "máquina de balas" puedes construir 4 balas de "escopeta"',
        probabilityToAppear: 3,
        lstToCombineItems: ['pólvora b'],
        bulletsCreation: {
            amount: 4,
            type: 'shotgunBullets'
        }
    },
    {
        name: 'pólvora c',
        type: 'bulletsCreation',
        desc: 'Teniendo la "máquina de balas" puedes construir 20 balas de "rifle de asalto"',
        probabilityToAppear: 3,
        lstToCombineItems: ['pólvora c'],
        bulletsCreation: {
            amount: 20,
            type: 'machinegunBullets'
        }
    },
    {
        name: 'tarjeta rpd',
        type: 'item',
        desc: 'Quien posea esta tarjeta podrá tener 1 acción extra en su turno (limitado a una tarjeta por jugador)',
        probabilityToAppear: 4
    },
    // {
    //     name: 'máquina de balas',
    //     type: 'item',
    //     desc: 'Teniendo pólvora puedes construir balas',
    //     probabilityToAppear: 0
    // },
    {
        name: 'frituras',
        type: 'item',
        desc: 'Tira un dado extra al atacar con un arma (usar este objeto no cuesta ninguna acción)',
        probabilityToAppear: 8,
        instantUse: true
    },
    {
        name: 'bebida energética',
        type: 'item',
        desc: 'Gana una acción extra este turno (usar este objeto no cuesta ninguna acción)',
        probabilityToAppear: 8,
        instantUse: true
    },
    {
        name: 'balas pistola',
        type: 'bullets',
        bulletsConfig: {
            type: 'gun',
            minQuantity: 3,
            maxQuantity: 7,
        },
        probabilityToAppear: 12
    },
    {
        name: 'balas escopeta',
        type: 'bullets',
        bulletsConfig: {
            type: 'shotgun',
            minQuantity: 2,
            maxQuantity: 5,
        },
        probabilityToAppear: 8
    },
    {
        name: 'balas ametralladora',
        type: 'bullets',
        bulletsConfig: {
            type: 'machinegun',
            minQuantity: 10,
            maxQuantity: 30,
        },
        probabilityToAppear: 7
    },
    {
        name: 'balas francotirador',
        type: 'bullets',
        bulletsConfig: {
            type: 'sniper',
            minQuantity: 1,
            maxQuantity: 4,
        },
        probabilityToAppear: 4
    },
    {
        name: 'walker',
        type: 'activation',
        probabilityToAppear: 5
    },
    {
        name: 'runner',
        type: 'activation',
        probabilityToAppear: 3
    },
    {
        name: 'boomer',
        type: 'activation',
        probabilityToAppear: 3
    },
    {
        name: 'némesis',
        type: 'activation',
        probabilityToAppear: 8
    }
]

export const lstResidentCombinedItems = [
    {
        name: 'mix hierbas verde x roja',
        type: 'health',
        desc: 'Combinación de hierba verde y roja, recupera 2 de vida',
        recover: 3,
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
        ],
    },
    {
        name: 'pólvora aa',
        type: 'bulletsCreation',
        desc: 'Teniendo la "máquina de balas" puedes construir 25 balas de pistola',
        itemsToCombine: [
            'pólvora a',
            'pólvora a',
        ],
        bulletsCreation: {
            amount: 25,
            type: 'gunBullets'
        }
    },
    {
        name: 'pólvora bb',
        type: 'bulletsCreation',
        desc: 'Teniendo la "máquina de balas" puedes construir 10 balas de "escopeta"',
        itemsToCombine: [
            'pólvora b',
            'pólvora b',
        ],
        bulletsCreation: {
            amount: 10,
            type: 'shotgunBullets'
        }
    },
    {
        name: 'pólvora cc',
        type: 'bulletsCreation',
        desc: 'Teniendo la "máquina de balas" puedes construir 50 balas de "rifle de asalto"',
        itemsToCombine: [
            'pólvora c',
            'pólvora c',
        ],
        bulletsCreation: {
            amount: 50,
            type: 'machinegunBullets'
        }
    },
    {
        name: 'cuchillos duales',
        type: 'weapon',
        desc: 'Uno en cada mano, la versatilidad de esto es impresionante',
        weapon: {
            minRange: 0,
            maxRange: 0,
            dices: 3,
            hit: 4,
            firePower: 1
        },
        itemsToCombine: [
            'cuchillo',
            'cuchillo',
        ],
    },
]

export const lstResidentZombies = [
    {
        name: 'walker',
        desc: 'Los Walkers avanzan 1 espacio por turno, mueren de 1 bala',
        actions: 1,
        min: 1,
        max: 1,
        probabilityToAppear: 65
    },
    {
        name: 'runner',
        desc: 'Los Walkers avanzan 2 espacios por turno, mueren de 1 bala',
        actions: 2,
        min: 1,
        max: 1,
        probabilityToAppear: 25
    },
    {
        name: 'boomer',
        desc: 'Los Bruts avanzan 1 espacio por turno, mueren de un golpe con armas nivel 2',
        actions: 1,
        min: 1,
        max: 1,
        probabilityToAppear: 10
    }
]

export const residentRooms = {
    upper: [
        'balcony',
        'attic',
        'bedroom',
        'master bedroom',
        'gallery',
        'tower',
    ],
    ground: [
        'ball room',
        'coal chute',
        'dining room',
        'gardens',
        'patio',
        'graveyard',
    ],
    basement: [
        'underground lake',
        'furnace room',
        'catacombs',
        'storeroom',
        'wine cellar',
        'larder',
        'pentagram chamber',
        'crypt',
        'chasm',
        'stairs from basement',
    ],
    sharedRooms: {
        upperGround: [
            'charred room',
            'conservatory',
            'chapel',
            'collapsed room',
            'bloody room',
            'library',
        ],
        groundBasement: [
            'abandoned room',
            'kitchen',
        ],
        upperGroundBasement: [
            'game room',
            'junk room',
            'organ room',
            'mystic elevator',
            'dusty hallway',
            'statuary corridor',
            'creaky hallway',
        ],
        upperBasement: [
            'vault',
            'stored room',
            'gymnasium',
            'research laboratory',
            'operating laboratory',
            'servants quarters',
        ],
    }
}
