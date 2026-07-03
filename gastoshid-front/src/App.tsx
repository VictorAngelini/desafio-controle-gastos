import React, { useState, useEffect } from 'react';

interface Pessoa {
  id?: number;
  nome: string;
  idade: number;
}

interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  tipo: 'Receita' | 'Despesa';
  pessoaId: number;
}

interface ResumoPessoa {
  id: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface TotalGeral {
  receitas: number;
  despesas: number;
  saldoLiquido: number;
}

const API_URL = 'http://localhost:5000/api/sistema';

export default function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [resumoPessoas, setResumoPessoas] = useState<ResumoPessoa[]>([]);
  const [totalGeral, setTotalGeral] = useState<TotalGeral>({ receitas: 0, despesas: 0, saldoLiquido: 0 });

  const [novaPessoa, setNovaPessoa] = useState({ nome: '', idade: 0 });
  const [novaTransacao, setNovaTransacao] = useState({ descricao: '', valor: 0, tipo: 'Despesa' as 'Receita' | 'Despesa', pessoaId: 0 });

  const carregarDados = async () => {
    try {
      const resPessoas = await fetch(`${API_URL}/pessoas`);
      setPessoas(await resPessoas.json());

      const resTransacoes = await fetch(`${API_URL}/transacoes`);
      setTransacoes(await resTransacoes.json());

      const resTotais = await fetch(`${API_URL}/totais`);
      const dadosTotais = await resTotais.json();
      setResumoPessoas(dadosTotais.resumoPorPessoa);
      setTotalGeral(dadosTotais.totalGeral);
    } catch (error) {
      console.error("Erro de conexao com o servidor:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleCriarPessoa = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API_URL}/pessoas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaPessoa)
    });
    setNovaPessoa({ nome: '', idade: 0 });
    carregarDados();
  };

  const handleDeletarPessoa = async (id: number) => {
    await fetch(`${API_URL}/pessoas/${id}`, { method: 'DELETE' });
    carregarDados();
  };

  const handleCriarTransacao = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const pessoaSelecionada = pessoas.find(p => p.id === Number(novaTransacao.pessoaId));
    if (pessoaSelecionada && pessoaSelecionada.idade < 18 && novaTransacao.tipo === 'Receita') {
      alert("Menores de 18 anos nao podem possuir receitas.");
      return;
    }

    const resposta = await fetch(`${API_URL}/transacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...novaTransacao,
        pessoaId: Number(novaTransacao.pessoaId),
        valor: Number(novaTransacao.valor)
      })
    });

    if (!resposta.ok) {
      const msg = await resposta.text();
      alert(msg);
    } else {
      setNovaTransacao({ descricao: '', valor: 0, tipo: 'Despesa', pessoaId: 0 });
      carregarDados();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Controle de Gastos Residenciais</h1>
      <hr />

      <section style={{ marginBottom: '30px' }}>
        <h2>Cadastro de Pessoas</h2>
        <form onSubmit={handleCriarPessoa}>
          <input 
            type="text" placeholder="Nome" value={novaPessoa.nome} required
            onChange={e => setNovaPessoa({ ...novaPessoa, nome: e.target.value })} 
          />
          <input 
            type="number" placeholder="Idade" value={novaPessoa.idade || ''} required
            onChange={e => setNovaPessoa({ ...novaPessoa, idade: Number(e.target.value) })} 
          />
          <button type="submit">Cadastrar Pessoa</button>
        </form>

        <h3>Lista de Pessoas</h3>
        <ul>
          {pessoas.map(p => (
            <li key={p.id}>
              ID: {p.id} | {p.nome} ({p.idade} anos)
              <button onClick={() => handleDeletarPessoa(p.id!)} style={{ marginLeft: '10px', color: 'red' }}>Excluir</button>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Cadastro de Transacoes</h2>
        <form onSubmit={handleCriarTransacao}>
          <input 
            type="text" placeholder="Descricao" value={novaTransacao.descricao} required
            onChange={e => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })} 
          />
          <input 
            type="number" step="0.01" placeholder="Valor" value={novaTransacao.valor || ''} required
            onChange={e => setNovaTransacao({ ...novaTransacao, valor: Number(e.target.value) })} 
          />
          <select value={novaTransacao.tipo} onChange={e => setNovaTransacao({ ...novaTransacao, tipo: e.target.value as 'Receita' | 'Despesa' })}>
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
          </select>
          <select value={novaTransacao.pessoaId} required onChange={e => setNovaTransacao({ ...novaTransacao, pessoaId: Number(e.target.value) })}>
            <option value="">Selecione a Pessoa</option>
            {pessoas.map(p => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
          <button type="submit">Registrar Transacao</button>
        </form>

        <h3>Lista de Transacoes</h3>
        <ul>
          {transacoes.map(t => (
            <li key={t.id}>
              {t.descricao} - R$ {t.valor.toFixed(2)} ({t.tipo})
            </li>
          ))}
        </ul>
      </section>

      <section style={{ backgroundColor: '#f5f5f5', padding: '15px' }}>
        <h2>Consulta de Totais</h2>
        <table border={1} cellPadding={5} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {resumoPessoas.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.nome}</td>
                <td>R$ {r.totalReceitas.toFixed(2)}</td>
                <td>R$ {r.totalDespesas.toFixed(2)}</td>
                <td>R$ {r.saldo.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '15px', padding: '10px', border: '1px solid #000' }}>
          <h3>Totais Gerais</h3>
          <p>Total Receitas: R$ {totalGeral.receitas.toFixed(2)}</p>
          <p>Total Despesas: R$ {totalGeral.despesas.toFixed(2)}</p>
          <p>Saldo Liquido: R$ {totalGeral.saldoLiquido.toFixed(2)}</p>
        </div>
      </section>
    </div>
  );
}
