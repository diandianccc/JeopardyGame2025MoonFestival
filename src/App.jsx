import { useState } from 'react'
import './App.css'

// Game data structure
const gameData = {
  "Moon Festival Basics": {
    200: {
      question: "What is the traditional food eaten during the Mid-Autumn Festival?",
      answer: "Mooncakes 🥮"
    },
    400: {
      question: "The Mid-Autumn Festival is often called the \"Festival of the ___.\"",
      answer: "Moon"
    },
    600: {
      question: "Which holiday is sometimes nicknamed the \"Chinese Thanksgiving\" because of its themes of reunion and harvest?",
      answer: "Mid-Autumn Festival"
    },
    800: {
      question: "In Vietnam, what is the Mid-Autumn Festival especially known for celebrating?",
      answer: "Children (It's also called the \"Children's Festival\")"
    },
    1000: {
      question: "What is the traditional Chinese name for the Mid-Autumn Festival?",
      answer: "Zhongqiu Jie (中秋节)"
    }
  },
  "Legends of the Moon": {
    200: {
      question: "Which goddess is said to live on the moon in Chinese mythology?",
      answer: "Chang'e"
    },
    400: {
      question: "What animal is believed to live on the moon, making elixirs?",
      answer: "The Jade Rabbit"
    },
    600: {
      question: "In the legend, why did Chang'e drink the elixir of immortality?",
      answer: "To prevent it from being stolen"
    },
    800: {
      question: "What do lanterns symbolize during the Mid-Autumn Festival?",
      answer: "Light, hope, and guidance"
    },
    1000: {
      question: "According to legend, what happened to Hou Yi after Chang'e flew to the moon?",
      answer: "He became immortal and was given a palace on the sun"
    }
  },
  "Moon Festival Customs": {
    200: {
      question: "The Mid-Autumn Festival is held on the 15th day of which lunar month?",
      answer: "The 8th month"
    },
    400: {
      question: "Besides mooncakes, which fruit is often eaten during the festival because of its round shape?",
      answer: "Pomelo 🍊"
    },
    600: {
      question: "True or False: The Mid-Autumn Festival is celebrated only in China.",
      answer: "False (Countries like Vietnam, Korea, Singapore, Malaysia, and more also celebrate it.)"
    },
    800: {
      question: "The Mid-Autumn Festival celebrates the full moon closest to which equinox?",
      answer: "The Autumn Equinox"
    },
    1000: {
      question: "In ancient China, what did people do with incense during the Mid-Autumn Festival?",
      answer: "Burn it to honor the moon goddess and ancestors"
    }
  },
  "All About Our Moon": {
    200: {
      question: "What causes the moon to shine at night?",
      answer: "Reflection of sunlight"
    },
    400: {
      question: "When the moon looks completely round and bright, what is it called?",
      answer: "A full moon"
    },
    600: {
      question: "How long does it take for the moon to orbit Earth?",
      answer: "About 27 days"
    },
    800: {
      question: "The \"dark side of the moon\" is actually…",
      answer: "Always facing away from Earth (it's not always dark!)"
    },
    1000: {
      question: "What causes the moon's phases to change?",
      answer: "The changing angles of sunlight hitting the moon as it orbits Earth"
    }
  },
  "Space & Exploration": {
    200: {
      question: "What's the name of the first person to walk on the moon?",
      answer: "Neil Armstrong"
    },
    400: {
      question: "Which Apollo mission successfully landed the first humans on the moon?",
      answer: "Apollo 11"
    },
    600: {
      question: "The moon is about what fraction of the Earth's size?",
      answer: "About 1/4"
    },
    800: {
      question: "True or False: The moon has its own light source.",
      answer: "False"
    },
    1000: {
      question: "What was the name of the lunar module that first landed on the moon?",
      answer: "Eagle"
    }
  },
  "Around the World": {
    200: {
      question: "In which country is the moon believed to be home to a moon goddess and a jade rabbit?",
      answer: "China (or any of the East Asian countries mentioned)"
    },
    400: {
      question: "What is the traditional name of the festival in Vietnam?",
      answer: "Tết Trung Thu"
    },
    600: {
      question: "What is the traditional name of the festival in Korea?",
      answer: "Chuseok"
    },
    800: {
      question: "In Japan, a similar harvest festival is celebrated, but instead of mooncakes, what are the traditional treats?",
      answer: "Dango (rice dumplings) or Tsukimi Dango"
    },
    1000: {
      question: "Which ancient Chinese poet wrote the famous poem 'Thoughts on a Quiet Night' about the moon?",
      answer: "Li Bai (Li Po)"
    }
  }
};

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [teams, setTeams] = useState([])
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState(new Set())
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const categories = Object.keys(gameData)
  const pointValues = [200, 400, 600, 800, 1000]

  const startGame = (gameTeams) => {
    setTeams(gameTeams)
    setGameStarted(true)
    setCurrentTeamIndex(0)
  }

  const handleQuestionClick = (category, points) => {
    const questionKey = `${category}-${points}`
    if (selectedQuestions.has(questionKey)) return

    setCurrentQuestion({
      category,
      points,
      ...gameData[category][points]
    })
    setShowAnswer(false)
    setSelectedQuestions(new Set([...selectedQuestions, questionKey]))
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }

  const handleCorrectAnswer = () => {
    setTeams(prev => prev.map((team, index) => 
      index === currentTeamIndex 
        ? { ...team, score: team.score + currentQuestion.points }
        : team
    ))
    setCurrentQuestion(null)
    setShowAnswer(false)
  }

  const handleWrongAnswer = () => {
    setTeams(prev => prev.map((team, index) => 
      index === currentTeamIndex 
        ? { ...team, score: team.score - currentQuestion.points }
        : team
    ))
    setCurrentTeamIndex((currentTeamIndex + 1) % teams.length)
  }

  const handleCloseQuestion = () => {
    setCurrentQuestion(null)
    setShowAnswer(false)
  }

  const resetGame = () => {
    setGameStarted(false)
    setTeams([])
    setCurrentTeamIndex(0)
    setSelectedQuestions(new Set())
    setCurrentQuestion(null)
    setShowAnswer(false)
  }

  if (!gameStarted) {
    return <TeamSetup onStartGame={startGame} />
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🌕 Mid-Autumn Festival Jeopardy 🏮</h1>
      </header>

      <div className="game-container">
        <div className="scores-sidebar">
          {teams.map((team, index) => (
            <div key={index} className={`team ${index === currentTeamIndex ? 'active' : ''}`}>
              <div className="team-name">{team.name}</div>
              <div className="team-score">${team.score}</div>
            </div>
          ))}
          <button onClick={resetGame} className="reset-btn">
            New Game
          </button>
        </div>

        <div className="game-board">
          {categories.map(category => (
            <div key={category} className="category-column">
              <div className="category-header">{category}</div>
              {pointValues.map(points => {
                const questionKey = `${category}-${points}`
                const isSelected = selectedQuestions.has(questionKey)
                return (
                  <div
                    key={points}
                    className={`question-cell ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleQuestionClick(category, points)}
                  >
                    {isSelected ? '✓' : `$${points}`}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {currentQuestion && (
        <div className="modal-overlay" onClick={handleCloseQuestion}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{currentQuestion.category} - ${currentQuestion.points}</h2>
              <button className="close-btn" onClick={handleCloseQuestion}>×</button>
            </div>
            <div className="modal-content">
              <div className="question">
                {currentQuestion.question}
              </div>
              {showAnswer && (
                <div className="answer">
                  <strong>Answer:</strong> {currentQuestion.answer}
                </div>
              )}
            </div>
            <div className="modal-actions">
              {!showAnswer ? (
                <button onClick={handleShowAnswer} className="show-answer-btn">
                  Show Answer
                </button>
              ) : (
                <div className="scoring-buttons">
                  <button onClick={handleCorrectAnswer} className="correct-btn">
                    Correct (+${currentQuestion.points})
                  </button>
                  <button onClick={handleWrongAnswer} className="wrong-btn">
                    Wrong (-${currentQuestion.points})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Team Setup Component
function TeamSetup({ onStartGame }) {
  const [numTeams, setNumTeams] = useState(2)
  const defaultTeamNames = ['Team Astro', 'Team Cody', 'Team Einstein', 'Team Appy']
  const [teamNames, setTeamNames] = useState(['Team Astro', 'Team Cody'])

  const handleNumTeamsChange = (num) => {
    setNumTeams(num)
    const newTeamNames = []
    for (let i = 0; i < num; i++) {
      newTeamNames.push(teamNames[i] || defaultTeamNames[i] || `Team ${i + 1}`)
    }
    setTeamNames(newTeamNames)
  }

  const handleTeamNameChange = (index, name) => {
    const newTeamNames = [...teamNames]
    newTeamNames[index] = name
    setTeamNames(newTeamNames)
  }

  const handleStartGame = () => {
    const teams = teamNames.map(name => ({ name, score: 0 }))
    onStartGame(teams)
  }

  return (
    <div className="app">
      <div className="team-setup">
        <h1>🌕 Mid-Autumn Festival Jeopardy 🏮</h1>
        <div className="setup-content">
          <h2>Game Setup</h2>
          
          <div className="team-count-selection">
            <h3>How many teams?</h3>
            <div className="team-count-buttons">
              {[2, 3, 4].map(num => (
                <button
                  key={num}
                  className={`team-count-btn ${numTeams === num ? 'active' : ''}`}
                  onClick={() => handleNumTeamsChange(num)}
                >
                  {num} Teams
                </button>
              ))}
            </div>
          </div>

          <div className="team-names">
            <h3>Team Names</h3>
            <div className="team-name-inputs">
              {teamNames.map((name, index) => (
                <div key={index} className="team-name-input">
                  <label>Team {index + 1}:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleTeamNameChange(index, e.target.value)}
                    placeholder={`Team ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="start-game-btn" onClick={handleStartGame}>
            Start Game! 🚀
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
