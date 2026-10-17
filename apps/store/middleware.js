export const config = {
  matcher: '/api/:path*',
}

export default async function middleware(request) {
  const backendUrl = process.env.VITE_BACKEND_URL
  if (!backendUrl) return new Response('Missing VITE_BACKEND_URL', { status: 500 })

  const url = new URL(request.url)
  const targetPath = url.pathname.replace(/^\/api/, '')
  const targetUrl = new URL(`${targetPath}${url.search}`, backendUrl)

  const headers = new Headers(request.headers)
  headers.set('host', targetUrl.host)
  headers.set('accept-encoding', 'identity')
  const reqBody = ['GET', 'HEAD'].includes(request.method) ? null : await request.text()

  return fetch(targetUrl, {
    method: request.method,
    headers: headers,
    body: reqBody,
  })
}
