import Router from 'next/router'
import isServer from './isServer'

const redirectToRoute = (route, ctx = {}) => {
  if (isServer() && Object.keys(ctx).length === 0) {
    // eslint-disable-next-line
    return console.error(
      'You seem to be using redirectToRoute on the server without providing ctx as second argument. In order to use redirectToRoute from server side you have to provide ctx as second argument.'
    )
  }

  if (isServer()) {
    ctx.res.writeHead(302, { Location: route })
    ctx.res.end()
  } else {
    Router.push(route)
  }
}

export default redirectToRoute
