import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Flag, Map, Trophy, Power } from 'lucide-react';

const RacingNotebook = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    const savedPilot = localStorage.getItem('perj_pilot');
    if (savedPilot) {
      setUsername(savedPilot);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (name) => {
    if (name.length > 2) {
      setUsername(name);
      setIsLoggedIn(true);
      localStorage.setItem('perj_pilot', name);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('perj_pilot');
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container animate-in">
        <div className="login-box">
          <div className="glitch-logo">DATAEX<span>STATION</span></div>
          <p className="subtitle">SISTEMA DE ACESSO</p>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="NICKNAME DO PILOTO..." 
              onChange={(e) => setUsername(e.target.value)}
            />
            <input type="password" placeholder="SENHA ENCRIPTADA..." />
          </div>
          <button className="login-btn" onClick={() => handleLogin(username)}>
            ESTABELECER CONEXÃO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notebook-container animate-in">
      <nav className="sidebar">
        <div className="logo">DATAEX<span>RACER</span></div>
        <ul>
          <li className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}>
            <LayoutDashboard size={18} /> <span>Painel</span>
          </li>
          <li className={tab === 'races' ? 'active' : ''} onClick={() => setTab('races')}>
            <Flag size={18} /> <span>Corridas</span>
          </li>
          <li className={tab === 'editor' ? 'active' : ''} onClick={() => setTab('editor')}>
            <Map size={18} /> <span>Traçados</span>
          </li>
          <li className={tab === 'stats' ? 'active' : ''} onClick={() => setTab('stats')}>
            <Trophy size={18} /> <span>Ranking</span>
          </li>
        </ul>
        
        <div className="user-info">
          <div className="pilot-details">
            <p>PILOTO: <span className="highlight">{username}</span></p>
            <p>STATUS: <span className="online">ONLINE</span></p>
          </div>
          <button className="logout-icon" onClick={handleLogout}>
            <Power size={16} />
          </button>
        </div>
      </nav>

      <main className="content">
        {/* ABA PAINEL */}
        {tab === 'dashboard' && (
          <div className="tab-content animate-in">
            <h2>Bem-vindo, {username}</h2>
            <div className="stats-cards">
              <div className="card"><h3>12</h3><p>Vitórias</p></div>
              <div className="card"><h3>A+</h3><p>Ranking</p></div>
              <div className="card"><h3>1.2k</h3><p>GNE Acumulado</p></div>
            </div>
            <div className="announcement">
              <h4>Aviso da Estação:</h4>
              <p>O evento "Reta de Interlagos" começa em 20 minutos. Prepare seu motor.</p>
            </div>
          </div>
        )}

        {/* ABA CORRIDAS */}
        {tab === 'races' && (
          <div className="tab-content animate-in">
            <h2>Corridas Ativas</h2>
            <div className="race-list">
              <div className="race-item">
                <div className="race-info-main">
                  <div className="race-title">SUBIDA DO CRISTO</div>
                  <div className="race-reward">PRÊMIO: <span>500 GNE</span></div>
                </div>
                <div className="race-details-row">
                  <div className="race-stats">
                    PILOTOS: <span className="highlight">3 / 8</span>
                  </div>
                  <button className="action-btn">ENTRAR NA ESTAÇÃO</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA EDITOR DE TRAÇADOS */}
        {tab === 'editor' && (
          <div className="tab-content animate-in">
            <h2>Criador de Circuitos</h2>
            <div className="editor-container">
              <div className="setup-grid">
                <div className="input-field">
                  <label>NOME DA ROTA</label>
                  <input type="text" placeholder="Ex: Fuga da Lapa..." />
                </div>
                <div className="input-field">
                  <label>APOSTA MÍNIMA (GNE)</label>
                  <input type="number" placeholder="0" />
                </div>
                <div className="input-field">
                  <label>LIMITE DE PILOTOS</label>
                  <select>
                    <option>2</option>
                    <option>4</option>
                    <option>8</option>
                    <option>16</option>
                  </select>
                </div>
              </div>

              <div className="checkpoint-control">
                <div className="status-display">
                  <p>CHECKPOINTS GRAVADOS: <span className="highlight">0</span></p>
                  <p>DISTÂNCIA TOTAL: <span className="highlight">0.0 KM</span></p>
                </div>
                <div className="button-group">
                  <button className="record-btn">INICIAR GRAVAÇÃO</button>
                  <button className="action-btn">SALVAR TRAÇADO</button>
                </div>
              </div>

              <div className="editor-help">
                <p>// Use o GPS do veículo para marcar os pontos de passagem no mapa.</p>
              </div>
            </div>
          </div>
        )}

        {/* ABA RANKING (Vazia por enquanto) */}
        {tab === 'stats' && (
          <div className="tab-content animate-in">
            <h2>Ranking da Estação</h2>
            <p>Sincronizando dados com a rede...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RacingNotebook;