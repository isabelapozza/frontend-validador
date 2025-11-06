// Arquivo: src/App.jsx

import React, { useState } from 'react';
import './App.css';

// A API agora está no mesmo lugar!
// Usamos uma URL "relativa" que aponta para nossa API.
const API_URL = '/api/validar-senha';


export default function App() {
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMensagem('');
    setErros([]);

    try {
      // Requisição POST para o nosso endpoint
      const response = await fetch(API_URL, { // <--- URL SIMPLIFICADA
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senha: senha }),
      });

      const data = await response.json();

      if (data.valida) {
        setMensagem('✅ Senha Válida!');
      } else {
        setMensagem('❌ Senha Inválida:');
        setErros(data.erros);
      }

    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      setMensagem('Erro no servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // O HTML (JSX) que o usuário vê
  return (
    <div className="App">
      <header className="App-header">
        <h1>Validador de Senha</h1>
        <p>Teste a força da sua senha (Frontend + Backend no mesmo projeto)</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Validando...' : 'Validar'}
          </button>
        </form>

        {/* Área de Resposta */}
        {mensagem && (
          <div className="resultado">
            <h3>{mensagem}</h3>
            <ul>
              {erros.map((erro, index) => (
                <li key={index}>{erro}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}