import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Pessoas.css'

interface Pessoa {
  pessoaId: number
  nome: string
  email: string
  telefone: string
  cpf: string
  turma: string
}

function ConsultaPessoas() {
  const navigate = useNavigate()
  const [pessoas, setPessoas] = useState<Pessoa[]>([])

  useEffect(() => {
    buscarPessoas()
  }, [])

  async function buscarPessoas() {
    try {
      const response = await axios.get<Pessoa[]>('http://localhost:8080/pessoas')
      setPessoas(response.data)
    } catch (error) {
      console.error(error)
      alert('Erro ao buscar pessoas')
    }
  }

  async function excluirPessoa(id: number) {
    if (!window.confirm('Deseja excluir esta pessoa?')) {
      return
    }

    try {
      await axios.delete(`http://localhost:8080/pessoas/${id}`)
      buscarPessoas()
    } catch (error) {
      console.error(error)
      alert('Erro ao excluir pessoa')
    }
  }

  function editarPessoa(id: number) {
    navigate(`/pessoas/editar/${id}`)
  }

  return (
    <div className="pessoas-pagina">
      <div className="pessoas-container">
        <div className="pessoas-topo">
          <div>
            <h1>Consulta de Pessoas</h1>
            <p>Visualize, edite ou exclua as pessoas cadastradas.</p>
          </div>

          <div className="pessoas-topo-botoes">
            <button className="pessoas-botao-novo" onClick={() => navigate('/pessoas/cadastro')}>
              Nova pessoa
            </button>
            <button className="pessoas-botao-voltar" onClick={() => navigate('/logado')}>
              Voltar
            </button>
          </div>
        </div>

        <div className="pessoas-lista-card">
          <div className="pessoas-lista-topo">
            <div>
              <h2>Pessoas cadastradas</h2>
              <p>Total de pessoas: {pessoas.length}</p>
            </div>
          </div>

          <div className="pessoas-tabela-container">
            <table className="pessoas-tabela">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>CPF</th>
                  <th>Turma</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {pessoas.map((pessoa) => (
                  <tr key={pessoa.pessoaId}>
                    <td>{pessoa.pessoaId}</td>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.email}</td>
                    <td>{pessoa.telefone}</td>
                    <td>{pessoa.cpf}</td>
                    <td>{pessoa.turma}</td>
                    <td>
                      <div className="pessoas-acoes">
                        <button className="pessoas-botao-editar" onClick={() => editarPessoa(pessoa.pessoaId)}>
                          Editar
                        </button>
                        <button className="pessoas-botao-excluir" onClick={() => excluirPessoa(pessoa.pessoaId)}>
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultaPessoas