import { useLocation } from 'react-router-dom';
import './Error.css';

export default function Error() {
    let error = useLocation()?.state?.error;
    console.log(error)
    return (
        <div id='error__container'>
            <h1>Whoopsie Daisy</h1>
            {error && <h2>{error}</h2>}
            <h3>Slam computer and try again</h3>
            <p>JK... pls don&apos;t. Just go home.</p>
        </div>
    )
}
