import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Alunos.css'

function CadastroMetas() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [nome, setNome] = useState('')
    const [categoria, setCategoria] = useState('Gamer')
    const [plataforma, setPlataforma] = useState('')
    const [tempoSemanal, setTempoSemanal] = useState('')
    const [nivelHabilidade, setNivelHabilidade] = useState('Médio')

    useEffect(() => {
        if (id) {
            buscarHobbyPorId()
        }
    }, [id])

    async function buscarHobbyPorId() {
        const response = await axios.get(
            `http://localhost:8080/hobbies/${id}`
        )

        setNome(response.data.nome)
        setCategoria(response.data.categoria)
        setPlataforma(response.data.plataforma)
        setTempoSemanal(String(response.data.tempoSemanal || ''))
        setNivelHabilidade(String(response.data.nivelHabilidade || 'Médio'))
    }

    async function salvarHobby() {

        const hobby = {
            nome,
            categoria,
            plataforma,
            tempoSemanal: Number(tempoSemanal),
            nivelHabilidade: nivelHabilidade
        }

        if (id) {
            await axios.put(
                `http://localhost:8080/hobbies/${id}`,
                hobby
            )

            alert('Hobby atualizado com sucesso!')
        } else {
            await axios.post(
                'http://localhost:8080/hobbies',
                hobby
            )

            alert('Hobby cadastrado com sucesso!')
        }

        navigate('/hobbies/consulta')
    }

    return (

        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>
                            {id ? 'Editar Hobby' : 'Cadastro de Hobby'}
                        </h1>

                        <p>
                            Preencha os dados do hobby abaixo
                        </p>
                    </div>

                    <button
                        className="alunos-botao-voltar"
                        onClick={() => navigate('/hobbies/consulta')}
                    >
                        Voltar
                    </button>

                </div>

                <div className="alunos-form-card alunos-form-centralizado">

                    <h2>
                        {id ? 'Alterar informações' : 'Novo hobby'}
                    </h2>

                    <div className="alunos-formulario">

                        <input
                            type="text"
                            placeholder="Nome do hobby"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="Esporte">Esporte</option>
                            <option value="Jogo">Jogo</option>
                            <option value="Arte">Arte</option>
                            <option value="Música">Música</option>
                            <option value="Leitura">Leitura</option>
                            <option value="Outro">Outro</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Plataforma"
                            value={plataforma}
                            onChange={(e) => setPlataforma(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Tempo semanal (horas)"
                            value={tempoSemanal}
                            onChange={(e) => setTempoSemanal(e.target.value)}
                        />

                        <select
                            value={nivelHabilidade}
                            onChange={(e) => setNivelHabilidade(e.target.value)}
                        >
                            <option value="1">Iniciante</option>
                            <option value="2">Intermediário</option>
                            <option value="3">Avançado</option>
                            <option value="4">Profissional</option>
                        </select>

                        <button
                            className="alunos-botao-salvar"
                            onClick={salvarHobby}
                        >
                            {id ? 'Salvar alterações' : 'Cadastrar hobby'}
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

export default CadastroMetas