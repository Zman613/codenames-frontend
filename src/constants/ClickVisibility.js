import { useState, useEffect, useRef } from 'react';

function ClickVisibility (initialVisibility) {
    const [getVisibility, setVisibility] = useState(initialVisibility);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setVisibility(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, getVisibility, setVisibility };
}

export default ClickVisibility