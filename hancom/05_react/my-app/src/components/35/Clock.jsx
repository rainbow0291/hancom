import {useState, useEffect} from "react";
import './Clock.css'

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)
        return () => clearInterval(timer) 
    }, [])
    
    return <p className="clock-display">{time}</p>
}

export default Clock
