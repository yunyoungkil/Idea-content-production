import React, { useState } from 'react'
import Board from 'react-trello'

const initialData = {
  lanes: [
    {
      id: 'lane1',
      title: 'To Do',
      cards: [
        {
          id: 'card1',
          title: 'Card 1',
          description: 'Description for card 1'
        }
      ]
    },
    {
      id: 'lane2',
      title: 'In Progress',
      cards: [
        {
          id: 'card2',
          title: 'Card 2',
          description: 'Description for card 2'
        }
      ]
    }
  ]
}

function App() {
  const [board, setBoard] = useState(initialData)

  const addLane = () => {
    const title = window.prompt('새 칸 제목을 입력하세요', '새 칸')
    if (title === null) return // 취소한 경우
    const id = 'lane_' + Date.now()
    const newLane = { id, title: title || '새 칸', cards: [] }
    setBoard(prev => ({ ...prev, lanes: [...prev.lanes, newLane] }))
    // 디버그 로그
    console.log('Added lane', newLane)
  }

  const onCardAdd = (card, laneId) => {
    // card: {id?, title, description?, label?, metadata?}
    const newCard = {
      id: card.id || 'card_' + Date.now(),
      title: card.title || '새 카드',
      description: card.description || card._description || '',
      label: card.label || ''
    }
    setBoard(prev => ({
      ...prev,
      lanes: prev.lanes.map(l => l.id === laneId ? { ...l, cards: [...l.cards, newCard] } : l)
    }))
    console.log('Added card', newCard, 'to lane', laneId)
  }

  const onCardDelete = (cardId, laneId) => {
    setBoard(prev => ({
      ...prev,
      lanes: prev.lanes.map(l => l.id === laneId ? { ...l, cards: l.cards.filter(c => c.id !== cardId) } : l)
    }))
    console.log('Deleted card', cardId, 'from lane', laneId)
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>React Kanban Test</h1>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button onClick={addLane} style={{ fontSize: 18, padding: '6px 12px' }}>+ 칸 추가</button>
      </div>
      <Board data={board} draggable editable onCardAdd={onCardAdd} onCardDelete={onCardDelete} onDataChange={(newData) => setBoard(newData)} />
    </div>
  )
}

export default App