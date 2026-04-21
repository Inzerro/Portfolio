import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

export function proxy(request: NextRequest) {
  const host = request.nextUrl.hostname

  if (process.env.NODE_ENV !== 'production' || LOCAL_HOSTS.has(host)) {
    return NextResponse.next()
  }

  const forwardedProto = request.headers.get('x-forwarded-proto')

  if (forwardedProto === 'http') {
    const httpsUrl = request.nextUrl.clone()
    httpsUrl.protocol = 'https:'

    return NextResponse.redirect(httpsUrl, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
