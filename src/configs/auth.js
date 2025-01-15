export default {
  meEndpoint:
    process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me` : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
  loginEndpoint:
    process.env.NODE_ENV === `production`
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
