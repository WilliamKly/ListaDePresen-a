import React, {useState, useEffect} from 'react'
import './style.css'
import Card from '../../components/Card'

function Home() {
  const [studantName, setStudantName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent(){
    const newStudent = {
      name: studantName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/WilliamKly')
    .then(res => res.json())
    .then(data => {
      setUser({
        name: data.login,
        avatar: data.avatar_url
      })
    })
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença com react</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil GitHub" />
        </div>
      </header>
      <input type="text"
      placeholder='Digite o nome...'
      onChange={e => setStudantName(e.target.value)}
      />
      <button type='button' onClick={handleAddStudent}>
        Adicionar
      </button>
      {
        students.map(student => (
          <Card
          key={student.time}
          name={student.name}
          time={student.time}
          />
        ))
      }
    </div>
  )

}

export default Home