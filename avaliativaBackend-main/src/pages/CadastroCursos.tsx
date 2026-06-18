import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Alunos.css'

function CadastroCursos() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [nome, setNome] = useState<string>('')
    const [instituicao, setInstituicao] = useState<string>('')
    const [cargaHoraria, setCargaHoraria] = useState<number | string>('')
    const [area, setArea] = useState<string>('')
    const [nivel, setNivel] = useState<number | string>('')
    const [status, setStatus] = useState<string>('Ativo')

    useEffect(() => {
        if (id) {
            buscarCursoPorId()
        }
    }, [id])

    async function buscarCursoPorId() {

        const response = await axios.get(
            `http://localhost:8080/cursos/${id}`
        )

        setNome(response.data.nome)
        setInstituicao(response.data.instituicao)
        setCargaHoraria(response.data.cargaHoraria)
        setArea(response.data.area)
        setNivel(response.data.nivel)
        setStatus(response.data.status)
    }

    async function salvarCurso() {

        const curso = {
            nome,
            instituicao,
            cargaHoraria: Number(cargaHoraria),
            area,
            nivel: Number(nivel),
            status
        }

        if (id) {

            await axios.put(
                `http://localhost:8080/cursos/${id}`,
                curso
            )

            alert('Curso atualizado com sucesso!')

        } else {

            await axios.post(
                'http://localhost:8080/cursos',
                curso
            )

            alert('Curso cadastrado com sucesso!')
        }

        navigate('/cursos/consulta')
    }

    return (

        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>

                        <h1>
                            {id ? 'Editar Curso' : 'Cadastro de Curso'}
                        </h1>

                        <p>
                            Preencha os dados do curso abaixo
                        </p>

                    </div>

                    <button
                        className="alunos-botao-voltar"
                        onClick={() => navigate('/cursos')}
                    >
                        Voltar
                    </button>

                </div>

                <div className="alunos-form-card alunos-form-centralizado">

                    <h2>
                        {id ? 'Alterar informações' : 'Novo curso'}
                    </h2>

                    <div className="alunos-formulario">

                        <input
                            type="text"
                            placeholder="Nome do curso"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Instituição"
                            value={instituicao}
                            onChange={(e) => setInstituicao(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Carga Horária"
                            value={cargaHoraria}
                            onChange={(e) => setCargaHoraria(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Área"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Nível"
                            value={nivel}
                            onChange={(e) => setNivel(e.target.value)}
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Encerrado">Encerrado</option>
                        </select>

                        <button
                            className="alunos-botao-salvar"
                            onClick={salvarCurso}
                        >
                            {id ? 'Salvar alterações' : 'Cadastrar curso'}
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

export default CadastroCursos