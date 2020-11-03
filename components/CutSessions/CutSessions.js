import useCutSessions from '../../utils/hooks/useCutSessions'

const CutSessions = () => {
  const { status, sessions } = useCutSessions()
  console.log('sessions:', sessions)
  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'success') {
    return (
      <ul>
        {sessions.map(session => (
          <li key={session.id}>{session.day}</li>
        ))}
      </ul>
    )
  }

  return null
}

export default CutSessions
