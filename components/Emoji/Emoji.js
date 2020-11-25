const Emoji = ({ symbol, label }) => {
  return (
    <span role="img" aria-label={label}>
      {symbol}
    </span>
  )
}

export default Emoji
