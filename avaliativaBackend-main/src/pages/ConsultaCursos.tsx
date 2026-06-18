import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Alunos.css'

function ConsultaCursos() {

    const navigate = useNavigate()

    const [curso, setCurso] = useState<any[]>([])

    useEffect(() => {
        buscarCursos()
    }, [])

    async function buscarCursos() {
        const response = await axios.get(
            'http://localhost:8080/curso'
        )

        setCurso(response.data)
    }

    async function excluirCurso(id: number) {

        const confirmar = confirm('Deseja realmente excluir este curso?')

        if (confirmar) {
            await axios.delete(
                `http://localhost:8080/curso/${id}`
            )

            alert('Curso excluído com sucesso!')

            buscarCursos()
        }
    }

    function editarCurso(id: number) {
        navigate(`/curso/editar/${id}`)
    }

    return (
        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>Consulta de Cursos</h1>

                        <p>
                            Visualize, edite ou exclua os cursos cadastrados
                        </p>
                    </div>

                    <div className="alunos-topo-botoes">

                        <button
                            className="alunos-botao-novo"
                            onClick={() => navigate('/curso/cadastro')}
                        >
                            Novo curso
                        </button>

                        <button
                            className="alunos-botao-voltar"
                            onClick={() => navigate('/logado')}
                        >
                            Voltar
                        </button>

                    </div>

                </div>

                <div className="alunos-lista-card">

                    <div className="alunos-lista-topo">

                        <div>
                            <h2>Cursos</h2>

                            <p>
                                Total de cursos: {curso.length}
                            </p>
                        </div>

                    </div>

                    <div className="alunos-tabela-container">

                        <table className="alunos-tabela">

                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Instituição</th>
                                    <th>Carga Horária</th>
                                    <th>Área</th>
                                    <th>Nível</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    curso.map((curso) => (

                                        <tr key={curso.id}>

                                            <td>{curso.nome}</td>
                                            <td>{curso.instituicao}</td>
                                            <td>{curso.cargaHora}</td>
                                            <td>{curso.are}</td>
                                            <td>{curso.nivel}</td>

                                            <td>
                                                <span className="alunos-status">
                                                    {curso.status}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="alunos-acoes">

                                                    <button
                                                        className="alunos-botao-editar"
                                                        onClick={() => editarCurso(curso.id)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="alunos-botao-excluir"
                                                        onClick={() => excluirCurso(curso.id)}
                                                    >
                                                        Excluir
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ConsultaCursos