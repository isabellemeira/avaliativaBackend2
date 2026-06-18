import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Alunos.css'

function CadastroAluno() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [nome, setNome] = useState('')
    const [idade, setIdade] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [turma, setTurma] = useState('')
    const [status, setStatus] = useState('Ativo')

    useEffect(() => {
        if (id) {
            buscarAlunoPorId()
        }
    }, [id])

    async function buscarAlunoPorId() {
        const response = await axios.get(
            `http://localhost:8080/alunos/${id}`
        )

        setNome(response.data.nome)
        setIdade(String(response.data.idade))
        setEmail(response.data.email)
        setTelefone(response.data.telefone)
        setTurma(response.data.turma)
        setStatus(response.data.status)
    }

    async function salvarAluno() {

        const aluno = {
            nome,
            idade: Number(idade),
            email,
            telefone,
            turma,
            status
        }

        if (id) {
            await axios.put(
                `http://localhost:8080/alunos/${id}`,
                aluno
            )

            alert('Aluno atualizado com sucesso!')
        } else {
            await axios.post(
                'http://localhost:8080/alunos',
                aluno
            )

            alert('Aluno cadastrado com sucesso!')
        }

        navigate('/alunos/consulta')
    }

    return (
        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>
                            {id ? 'Editar Aluno' : 'Cadastro de Aluno'}
                        </h1>

                        <p>
                            Preencha os dados do aluno abaixo
                        </p>
                    </div>

                    <button
                        className="alunos-botao-voltar"
                        onClick={() => navigate('/alunos/consulta')}
                    >
                        Consultar alunos
                    </button>

                </div>

                <div className="alunos-form-card alunos-form-centralizado">

                    <h2>
                        {id ? 'Alterar informações' : 'Novo aluno'}
                    </h2>

                    <div className="alunos-formulario">

                        <input
                            type="text"
                            placeholder="Nome do aluno"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Idade"
                            value={idade}
                            onChange={(e) => setIdade(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Turma"
                            value={turma}
                            onChange={(e) => setTurma(e.target.value)}
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Transferido">Transferido</option>
                        </select>

                        <button
                            className="alunos-botao-salvar"
                            onClick={salvarAluno}
                        >
                            {id ? 'Salvar alterações' : 'Cadastrar aluno'}
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

export default CadastroAluno