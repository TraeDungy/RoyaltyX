import { useParams } from 'react-router-dom';

const Read = () => {
    const { id } = useParams();

    return (
        <div>
            {id}
        </div>
    );
}

export default Read;
