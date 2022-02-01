import {useState} from 'react';

const useCounter = () => {
    const {counter, setCounter} = useState(0)

    const sumar = setCounter(counter + 1)
    const restar = setCounter(counter - 1)
    
return (
    counter, sumar, restar
)

}

export default useCounter