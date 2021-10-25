import { useEffect, useState  } from "react";
import api from '../../services/api';

export default function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect (() =>{

        async function loadFilmes(){
            const response = await api.get('r-api/?api=filmes')
            setFilmes(response.data);
        }
        loadFilmes();
    }, []);

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filmes)=>{
                    return(
                        <article key={filmes.id}>
                            <strong>{filmes.nome}</strong>
                            <img src={filmes.foto} alt={filmes.nome} />
                        </article>
                    )
              })}
            </div>
        </div>
    );
}