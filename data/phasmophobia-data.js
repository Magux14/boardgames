


export const phasmophobiaEquipment = [
    {
        name: 'Medidor EMF 5',
        property: 'emf5'
    },
    {
        name: 'Proyector D.O.T.S',
        property: 'dots'
    },
    {
        name: 'Ultravioleta',
        property: 'ultraviolet'
    },
    {
        name: 'Orbes espectrales',
        property: 'orbs'
    },
    {
        name: 'Escritura fantasma',
        property: 'ghostWriting'
    },
    {
        name: 'Spirit Box',
        property: 'spiritBox'
    },
    {
        name: 'Temperaturas heladas',
        property: 'freezing'
    },
]

export const phasmophobiaEquipmentTests = {
    emf5: false,
    dots: false,
    ultraviolet: false,
    orbs: false,
    ghostWriting: false,
    spiritBox: false,
    freezing: false
}

export const phasmophobiaGhostList = [
    {
        name: 'Espíritu',
        emf5: true,
        spiritBox: true,
        ghostWriting: true,
    },
    {
        name: 'Espectro',
        emf5: true,
        spiritBox: true,
        dots: true,
    },
    {
        name: 'Ente',
        spiritBox: true,
        ultraviolet: true,
        dots: true,
    },
    {
        name: 'Poltergeist',
        spiritBox: true,
        ultraviolet: true,
        ghostWriting: true,
    },
    {
        name: 'Banshee',
        ultraviolet: true,
        orbs: true,
        dots: true,
    },
    {
        name: 'Jinn',
        emf5: true,
        ultraviolet: true,
        freezing: true
    },
    {
        name: 'Pesadilla',
        spiritBox: true,
        orbs: true,
        ghostWriting: true,
    },
    {
        name: 'Revenant',
        orbs: true,
        ghostWriting: true,
        freezing: true
    },
    {
        name: 'Sombra',
        emf5: true,
        ghostWriting: true,
        freezing: true
    },
    {
        name: 'Demonio',
        ultraviolet: true,
        ghostWriting: true,
        freezing: true
    },
    {
        name: 'Yurei',
        orbs: true,
        freezing: true,
        dots: true,
    },
    {
        name: 'Oni',
        emf5: true,
        freezing: true,
        dots: true,
    },
    {
        name: 'Yokai',
        spiritBox: true,
        orbs: true,
        dots: true,
    },
    {
        name: 'Hantu',
        ultraviolet: true,
        orbs: true,
        freezing: true
    },
    {
        name: 'Goryo',
        emf5: true,
        ultraviolet: true,
        dots: true,
    },
    {
        name: 'Myling',
        emf5: true,
        ultraviolet: true,
        ghostWriting: true,
    },
    {
        name: 'Onryo',
        spiritBox: true,
        orbs: true,
        freezing: true
    },
    {
        name: 'Gemelos',
        emf5: true,
        spiritBox: true,
        freezing: true
    },
    {
        name: 'Raiju',
        emf5: true,
        orbs: true,
        dots: true,
    },
    {
        name: 'Obake',
        emf5: true,
        ultraviolet: true,
        orbs: true,
    },
    {
        name: 'Mímico',
        spiritBox: true,
        ultraviolet: true,
        freezing: true,
        orbs: true,
    },
    {
        name: 'Moroi',
        spiritBox: true,
        ghostWriting: true,
        freezing: true
    },
    {
        name: 'Deogen',
        spiritBox: true,
        ghostWriting: true,
        dots: true,
    },
    {
        name: 'Thaye',
        orbs: true,
        ghostWriting: true,
        dots: true,
    }
]

export const phasmophobiaTarotCards = [
    {
        name: 'El Colgado',
        description: 'Mueres instantáneamente',
        img: 'el_colgado.webp',
        probability: 1
    },
    {
        name: 'El Diablo',
        description: '+ 2 energía maldita',
        img: 'el_diablo.webp',
        probability: 15
    },
    {
        name: 'El Sol',
        description: 'Recuperas tu cordura al 100%',
        img: 'el_sol.webp',
        probability: 5
    },
    {
        name: 'La Luna',
        description: 'Tu cordura baja a 1 punto',
        img: 'la_luna.webp',
        probability: 5
    },
    {
        name: 'La Torre',
        description: 'Puedes voltear una prueba oculta',
        img: 'la_torre.webp',
        probability: 17
    },
    {
        name: 'Muerte',
        description: 'Inicia una casería, pierdes 4 de cordura',
        img: 'muerte.webp',
        probability: 17
    },
    {
        name: 'Ruleta de la fortuna',
        description: '- 2 de cordura',
        img: 'ruleta_de_la_fortuna.webp',
        probability: 15,
    },
    {
        name: 'Ruleta de la fortuna',
        description: '+ 2 de cordura',
        img: 'ruleta_de_la_fortuna.webp',
        probability: 23
    },
    {
        name: 'Sacerdotisa',
        description: 'Revives a un compañero muerto, tendrá 2 de cordura',
        img: 'sacerdotisa.webp',
        probability: 2
    }
]