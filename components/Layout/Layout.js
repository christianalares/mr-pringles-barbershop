const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Kismo Motors</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout