import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const usuario = { nome, email, senha };

    try {
      setCarregando(true);
      const response = await axios.post(
        'http://localhost:8080/usuario/cadastrar',
        usuario
      );

      alert(response.data);
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);


      if (axios.isAxiosError(error) && error.response) {

        const mensagemErro = error.response.data?.mensagem || error.response.data;
        alert(`Erro: ${mensagemErro}`);
      } else {
        alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Criar Conta</h1>
        <p>Preencha os dados abaixo</p>

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
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={cadastrar} disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <Link to="/">Fazer login</Link>
      </div>
    </div>
  );
}

export default Cadastro;
