import { useEffect, useState } from 'react';
import { BookingNavigation } from '../components/BookingNavigation/BookingNavigation';
import { CheckBaggage } from '../components/BookingCheckBaggagePage/CheckBaggage';
import { OrderSummary } from '../components/OrderSummary/OrderSummary';
import '../stylesheets/BookingCheckBaggagePage.css';

export function BookingCheckBaggagePage() {
    const [isSameForBothWays, setIsSameForBothWays] = useState(true);
    const [selectedDirection, setSelectedDirection] = useState('both'); // 'first', 'second', or 'both'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [baggage10kg, setBaggage10kg] = useState({
        first: false,
        second: false
    });

    const toggleSameForBothWays = () => {
        setIsSameForBothWays(!isSameForBothWays);

        if (!isSameForBothWays) {
            setBaggage10kg({
                first: baggage10kg.first,
                second: baggage10kg.first
            });

            setSelectedDirection('both');
        } else {
            setSelectedDirection('first');
        }
    };

    const add10kgFunc = () => {
        if (isSameForBothWays) {
            const newValue = !baggage10kg.first;
            setBaggage10kg({ first: newValue, second: newValue });
        } else {
            setBaggage10kg(prev => ({
                ...prev,
                [selectedDirection]: !prev[selectedDirection]
            }));
        }
    };

    const handleDirectionSelect = (direction) => {
        setSelectedDirection(direction);
    };

    return (
        <div className="BookingCheckBaggagePage">
            <BookingNavigation />

            <div className="page-row container">
                <CheckBaggage
                    isSameForBothWays={isSameForBothWays}
                    toggleSameForBothWays={toggleSameForBothWays}
                    baggage10kg={baggage10kg}
                    add10kgFunc={add10kgFunc}
                    selectedDirection={selectedDirection}
                    handleDirectionSelect={handleDirectionSelect}
                />

                <OrderSummary
                    next_page={'/booking/client-info'}
                    action_btn={'go-to-next-page'}
                    btn_text={'Continue'}
                />
            </div>
        </div>
    );
}
