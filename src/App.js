import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resp => setRepositories(resp.data));
  }, []);

  async function handleAddRepository() {
    const data = {
      title: `Projeto ${Date.now()}`, 
      url: 'https://github.com/bulnes', 
      techs: ['HTML', 'CSS', 'JS', 'React', 'Node']
    };

    const resp = await api.post('repositories', data);
    setRepositories([...repositories, resp.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(repo => repo.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
