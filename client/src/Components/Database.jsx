import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'

export default function Database(props) {

    let [Database, setDb] = useState([{}]);
    let [Collections, setCollections] = useState([]);

    useEffect(() => {
        fetchDatabase();
    }, [])

    let fetchDatabase = async () => {
        await axios.get("http://localhost:5000/Database")
            .then(response => {
                // console.log(response.data);
                setDb(response.data)
            })
    }

    let handleSelection = async (e) => {
        // props.selectDatabase(e)
        // setSelectedDB(e)
        await axios.get(`http://localhost:5000/Collections/${e}`)
            .then((response) => {
                // console.log(response.data);
                setCollections(response.data);
            })
        // console.log(e)
        return e;
    }

    return (
        <div key='0'>
            <Accordion>
                {Database.map((dbs, index) => (
                    <Accordion.Item eventKey={index} onClick={() => { handleSelection(dbs.name) }}>
                        <Accordion.Header>{dbs.name}</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                {Collections.map((element, index) => (
                                    <li key={index} onClick={() => { props.selectCollection(element.name, dbs.name) }}>{element.name}</li>
                                ))}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}

            </Accordion>
        </div>
    )
}
