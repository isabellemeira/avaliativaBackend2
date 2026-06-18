import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './Pessoas.css'

function CadastroPessoas() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [turma, setTurma] = useState('')

  useEffect(() => {
    if (id) {
      buscarPessoa()
    }
  }, [id])

  async function buscarPessoa() {
    try {
      const response = await axios.get(`http://localhost:8080/pessoas/${id}`)
      setNome(response.data.nome)
      setEmail(response.data.email)
      setCpf(response.data.cpf || '')
      setTelefone(response.data.telefone || '')
      setTurma(response.data.turma || '')
    } catch (error) {
      console.error(error)
      alert('Erro ao buscar pessoa')
    }
  }

  async function salvarPessoa() {
    if (!nome || !email || !cpf || !telefone || !turma) {
      alert('Preencha todos os campos: nome, email, telefone, CPF e turma.')
      return
    }

    const pessoa = {
      nome,
      email,
      cpf,
      telefone,
      turma
    }

    try {
      if (id) {
        await axios.put(`http://localhost:8080/pessoas/${id}`, pessoa)
        alert('Pessoa atualizada com sucesso!')
      } else {
        await axios.post('http://localhost:8080/pessoas', pessoa)
        alert('Pessoa cadastrada com sucesso!')
      }

      navigate('/pessoas/consulta')
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.response?.data || error.message || 'Erro ao salvar pessoa'
      console.error('Erro salvarPessoa:', error)
      alert(`Erro ao salvar pessoa: ${message}`)
    }
  }

  return (
    <div className="pessoas-pagina">
      <div className="pessoas-container">
        <div className="pessoas-topo">
          <div>
            <h1>{id ? 'Editar Pessoa' : 'Cadastro de Pessoa'}</h1>
            <p>Preencha os dados da pessoa abaixo.</p>
          </div>
          <button className="pessoas-botao-voltar" onClick={() => navigate('/pessoas/consulta')}>
            Consultar pessoas
          </button>
        </div>

        <div className="pessoas-form-card pessoas-form-centralizado">
          <h2>{id ? 'Alterar informações' : 'Nova pessoa'}</h2>

          <div className="pessoas-formulario">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />

            <input
              type="text"
              placeholder="Turma"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
            />

            <div className="pessoas-botoes">
              <button className="pessoas-botao-salvar" onClick={salvarPessoa}>Salvar</button>
              <button className="pessoas-botao-cancelar" onClick={() => navigate('/pessoas/consulta')}>
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroPessoas