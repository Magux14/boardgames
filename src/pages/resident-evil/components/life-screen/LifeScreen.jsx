import './life-screen.scss';

export const LifeScreen = ({ lifePoints }) => {

    const getCurrentLifeColor = (lifePoints) => {
        if (lifePoints >= 4) {
            return 'lime';
        } else if (lifePoints == 3) {
            return 'rgb(255, 213, 0)';
        } else if (lifePoints == 2) {
            return 'rgb(255, 153, 0)';
        } else if (lifePoints == 1) {
            return 'rgb(189, 22, 22)';
        } else {
            return 'white';
        }
    }

    const currentLifeColor = getCurrentLifeColor(lifePoints);

    return (

        <div className="ecg-container">
            <svg className="ecg-line" viewBox="0 0 1000 100" preserveAspectRatio="none">

                {
                    lifePoints > 0
                        ?
                        <path
                            d="
M 0,50 
L 100,50 
C 110,50 115,0 120,50 
L 125,50 
C 135,50 140,100 145,50 
L 200,50 
C 210,50 215,0 220,50 
L 225,50 
C 235,50 240,100 245,50 
L 300,50 
C 310,50 315,0 320,50 
L 325,50 
C 335,50 340,100 345,50 
L 400,50 
C 410,50 415,0 420,50 
L 425,50 
C 435,50 440,100 445,50 
L 500,50 
C 510,50 515,0 520,50 
L 525,50 
C 535,50 540,100 545,50 
L 600,50 
C 610,50 615,0 620,50 
L 625,50 
C 635,50 640,100 645,50 
L 700,50 
C 710,50 715,0 720,50 
L 725,50 
C 735,50 740,100 745,50 
L 800,50 
C 810,50 815,0 820,50 
L 825,50 
C 835,50 840,100 845,50 
L 900,50 
C 910,50 915,0 920,50 
L 925,50 
C 935,50 940,100 945,50 
L 1000,50
"
                            fill="none"
                            stroke={currentLifeColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                        :
                        <path
                            d="M 0,50 L 1000,50"
                            fill="none"
                            stroke={currentLifeColor}
                            strokeWidth="2"
                        />
                }
            </svg>
        </div>



    )
}
