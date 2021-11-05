import { useEffect, useState } from 'react';
import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { toast } from 'react-toastify';

export default function Filme(){
    const { id } = useParams();
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0){
                //Tentou acessar com um ID que não existe, navego ele para home!
                history.replace('/');
            }

            setFilme(response.data);
            setLoading(false);

            return () =>{
                console.log('COMPONENTE DESMONTADO')
            }
        }

        loadFilme();
    
    }, [history, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        // se tiver algum filme salvo com esse mesmo ID precisa ignorar ...
        const hasfilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id )

        if(hasfilme){
            toast.error('Voçê já possui esse filme salvo.');
            //Para a execução de codigo aqui...
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.info('Filme salvo com sucessso!');
    }
  
    if(loading){
        return(
        <div className="filme-info">
            <h1>Carregango de filme...</h1>
        </div>
    )
    }
    return(
        <div className="filme-info">
            <h1> {filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome}/>

            <h3> Sinopse</h3>
            {filme.sinopse}

            <div className="botoes">
                <button onClick={salvarFilme} >Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                        </a>
                </button>
            </div>
        </div>
    )
}