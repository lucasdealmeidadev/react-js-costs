import { useParams } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';

import './Project.css';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
        })
        .catch((error) => console.log(error));

    }, [id]);

    return (
        <div>
            <p>{project.name}</p>
        </div>
    );
}

export default memo(Project);