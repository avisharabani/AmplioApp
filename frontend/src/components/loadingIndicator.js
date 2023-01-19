import { Link } from 'react-router-dom'
import { loadingStatus } from '../helpers'

const LoadingIndicator = ({ loadingState }) => {
    return (
        <>
            <h3>{loadingState}</h3>
            {loadingState === loadingStatus.hasErrored && <Link to="/">back home</Link>}
        </>
    );
}

export default LoadingIndicator;