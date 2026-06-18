import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Logado.css'
import type { Usuario } from '../types/Usuario'

function Logado() {

    const navigate = useNavigate()

    const [usuario, setUsuario] = useState(null as Usuario | null)

    useEffect(() => {
        buscarUsuario()
    }, [])

    async function buscarUsuario() {
        const response = await axios.get(
            'http://localhost:8080/usuario/logado'
        )

        setUsuario(response.data)
    }

    function sair() {
        navigate('/')
    }

    const cadastros = [
        {
            titulo: 'Alunos',
            descricao: 'Gerenciar alunos cadastrados no sistema',
            rota: '/alunos/consulta',
            icone: '🎓'
        },
        {
            titulo: 'Tarefas',
            descricao: 'Cadastrar e acompanhar tarefas escolares',
            rota: '/tarefas',
            icone: '📚'
        },
        {
            titulo: 'Metas',
            descricao: 'Registrar metas pessoais e acadêmicas',
            rota: '/metas',
            icone: '🎯'
        },
        {
            titulo: 'Cursos',
            descricao: 'Organizar cursos e formações realizadas',
            rota: '/cursos',
            icone: '💻'
        },
        {
            titulo: 'Eventos',
            descricao: 'Controlar eventos, palestras e workshops',
            rota: '/eventos',
            icone: '📅'
        },
        {
            titulo: 'Hobbies',
            descricao: 'Cadastrar jogos, esportes e atividades favoritas',
            rota: '/hobbies',
            icone: '🎮'
        },
        {
            titulo: 'Conquistas',
            descricao: 'Registrar conquistas e pontuações dos alunos',
            rota: '/conquistas',
            icone: '🏆'
        }
    ]

    return (
        <div className="logado-pagina">

            <div className="logado-painel">

                <div className="logado-cabecalho">

                    <div>
                        <h1 className="logado-titulo">
                            Vida de Aluno 360
                        </h1>

                        {
                            usuario &&
                            <p className="logado-subtitulo">
                                Bem-vindo, {usuario.nome}
                            </p>
                        }
                    </div>

                    <button
                        onClick={sair}
                        className="logado-botao-sair"
                    >
                        Sair
                    </button>

                </div>

                <div className="logado-grade">

{
  cadastros.map((cadastro, index) => (
    <div className="logado-card" key={index}>

       <div className="logado-card-icone">
        {cadastro.icone}
                                </div>

                                <h2 className="logado-card-titulo">
                                    {cadastro.titulo}
                                </h2>

                                <p className="logado-card-texto">
                                    {cadastro.descricao}
                                </p>

                                <button
                                    onClick={() => navigate(cadastro.rota)}
                                    className="logado-card-botao"
                                >
                                    Acessar cadastro
                                </button>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>
    )
}

export default Logado