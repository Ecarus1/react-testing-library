import { useEffect, useState } from "react";

function App() {
    const [data, setData] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [value, setValue] = useState('');

    const onClick = () => {
        setToggle(prev => !prev)
    }

    useEffect(() => {
        setTimeout(() => {
            setData({})
        }, 100);
    }, []);

    return (
        <div>
            <h1 data-testid='value-elem'>{value}</h1>
            {/* Если toggle равен true, то блок будет видно */}
            {toggle === true && <div data-testid="toggle-elem">toggle</div>}
            {data && <div style={{color: 'red'}}>data</div>}
            <h1>Hello World</h1>
            <button data-testid="toggle-btn" onClick={onClick}>click me</button>
            <input onChange={e => setValue(e.target.value)} type="text" placeholder="vAaaluess...."/>
        </div>
    );
}

export default App;
