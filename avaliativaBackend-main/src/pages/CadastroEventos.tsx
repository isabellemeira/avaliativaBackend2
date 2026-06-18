import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Alunos.css'

function CadastroEventos() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [data, setData] = useState('')
    const [local, setLocal] = useState('')
    const [horario, setHorario] = useState('')
    const [tipo, setTipo] = useState('Palestra')

    useEffect(() => {
        if (id) {
            buscarEventoPorId()
        }
    }, [id])

    async function buscarEventoPorId() {
        const response = await axios.get(
            `http://localhost:8080/eventos/${id}`
        )

        setNome(response.data.nome)
        setDescricao(response.data.descricao)
        setData(response.data.data)
        setLocal(response.data.local)
        setHorario(response.data.horario)
        setTipo(response.data.tipo)
    }

    async function salvarEvento() {

        const evento = {
            nome,
            descricao,
            data,
            local,
            horario,
            tipo
        }

        if (id) {
            await axios.put(
                `http://localhost:8080/eventos/${id}`,
                evento
            )

            alert('Evento atualizado com sucesso!')
        } else {
            await axios.post(
                'http://localhost:8080/eventos',
                evento
            )

            alert('Evento cadastrado com sucesso!')
        }

        navigate('/eventos/consulta')
    }

    return (

        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>
                            {id ? 'Editar Evento' : 'Cadastro de Evento'}
                        </h1>

                        <p>
                            Preencha os dados do evento abaixo
                        </p>
                    </div>

                    <button
                        className="alunos-botao-voltar"
                        onClick={() => navigate('/eventos/consulta')}
                    >
                        Voltar
                    </button>

                </div>

                <div className="alunos-form-card alunos-form-centralizado">

                    <h2>
                        {id ? 'Alterar informações' : 'Novo evento'}
                    </h2>

                    <div className="alunos-formulario">

                        <input
                            type="text"
                            placeholder="Nome do evento"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <input
                            type="date"
                            placeholder="Data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Local"
                            value={local}
                            onChange={(e) => setLocal(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Horário"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                        />

                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="Evento">Evento</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Palestra">Palestra</option>
                            <option value="Feira">Feira</option>
                        </select>

                        <button
                            className="alunos-botao-salvar"
                            onClick={salvarEvento}
                        >
                            {id ? 'Salvar alterações' : 'Cadastrar evento'}
                        </button>

                        <button
                            className="alunos-botao-cancelar"
                            onClick={() => navigate('/logado')}
                        >
                            Voltar ao painel
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CadastroEventos