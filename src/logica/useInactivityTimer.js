import { useState, useEffect, useRef } from 'react';

function useInactivityTimer(tancarSessio, logged, usuari) {
    const Ref = useRef(null);
    const [timer, setTimer] = useState('01:00');
    const [tiempoAlarma, setTiempoAlarma] = useState(false);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    };

    const startTimer = (e) => {
        let { total, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            );
            if ((total / 1000) === 15) {
                setTiempoAlarma(true);
            };
        };
    };

    const clearTimer = (e) => {
        setTimer('01:00');
        if (Ref.current) clearInterval(Ref.current);
        if (e) {
            const id = setInterval(() => {
                startTimer(e);
            }, 1000);
            Ref.current = id;
        };
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    };

    const checkForInactivity = () => {
        const expireTime = localStorage.getItem("expireTime");
        if (expireTime < Date.now()) {
            const expireTime = null;
            localStorage.setItem("expireTime", expireTime);
            comencaCompteEnrere();
        };
    };

    const comencaCompteEnrere = () => {
        setTiempoAlarma(false);
        clearTimer(getDeadTime());
    };

    const updateExpireTime = () => {
        const expireTime = (
            usuari === "admin" ||
            usuari === "sergi_nadal" ||
            usuari === "sergi"
        )
            ? Date.now() + 1200000
            : Date.now() + 120000;
        localStorage.setItem("expireTime", expireTime);
        setTiempoAlarma(false);
        clearTimer(null);
    };

    useEffect(() => {
        if (timer) {
            timer === '00:00' && (tancarSessio());
        };
    }, [timer]);

    useEffect(() => {
        if (logged) {
            const interval = setInterval(() => {
                checkForInactivity();
            }, 5000);
            return () => clearInterval(interval);
        };
    }, [logged]);

    useEffect(() => {
        if (logged) {
            updateExpireTime();
            window.addEventListener("click", updateExpireTime);
            window.addEventListener("keypress", updateExpireTime);
            window.addEventListener("scroll", updateExpireTime);
            window.addEventListener("mousemove", updateExpireTime);
            return () => {
                window.removeEventListener("click", updateExpireTime);
                window.removeEventListener("keypress", updateExpireTime);
                window.removeEventListener("scroll", updateExpireTime);
                window.removeEventListener("mousemove", updateExpireTime);
            };
        };
    }, [logged]);


    return [tiempoAlarma, timer];
}

export default useInactivityTimer;