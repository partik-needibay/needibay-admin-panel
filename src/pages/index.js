// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = role => {
  if (role[0].name === 'ROLE_INFLUENCER') return '/dashboards/ecommerce'
  else return '/dashboards/ecommerce'
}

const Home = () => {
  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  console.log(auth.user.roles);
  useEffect(() => {
    if (auth.user && auth.user.roles) {
      const homeRoute = getHomeRoute(auth.user.roles)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
