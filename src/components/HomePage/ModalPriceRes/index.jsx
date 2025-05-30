import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';
import './ModalPriceRes.css';

export function ModalPriceRes() {
    const { currentLang } = useContext(LanguageContext);
    const dataInLocalStorage = JSON.parse(localStorage.getItem('price_res'));

    return (
        <div className='ModalPriceRes'>
            <div className="bg"></div>

            <div className={`content ${dataInLocalStorage.ok ? '' : 'error'}`}>
                <h2>{dataInLocalStorage.responseObj[currentLang].split('/')[0]}</h2>
                <p>{dataInLocalStorage.responseObj[currentLang].split('/')[1]}</p>
            </div>
        </div>
    )
}
