import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Logado from './pages/Logado'

import CadastroAluno from './pages/CadastroAlunos'
import ConsultaAlunos from './pages/ConsultaAlunos'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/logado"
          element={<Logado />}
        />

        <Route
          path="/alunos/cadastro"
          element={<CadastroAluno />}
        />

        <Route
          path="/alunos/consulta"
          element={<ConsultaAlunos />}
        />

        <Route
          path="/alunos/editar/:id"
          element={<CadastroAluno />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App