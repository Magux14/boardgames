
import './search-item-question.scss';

export const SearchItemQuestion = () => {
    return (
        <div className="search-item-question__container">
            <div className="search-item-question__title-container">
                ¿Dónde estás buscando?
            </div>
            <div className="search-item-question__option-container">
                <button>En una habitación</button>
            </div>
            <div className="search-item-question__option-container">
                <button>En una caja de armas</button>
            </div>
            <div className="search-item-question__option-container">
                <button>Un compañero me está dando un objeto</button>
            </div>
        </div>

    )
}
