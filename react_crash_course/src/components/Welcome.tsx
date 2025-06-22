interface WelcomeProps {
  isLoggedIn: boolean
  username?: string
}

const Welcome = ({ isLoggedIn, username }: WelcomeProps) => {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  )
}

export default Welcome
