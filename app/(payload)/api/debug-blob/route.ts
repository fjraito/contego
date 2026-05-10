import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  const hasToken = Boolean(token)
  const tokenPrefix = token ? token.slice(0, 25) : null
  const tokenSuffix = token ? token.slice(-8) : null

  let testResult: any = null
  if (token) {
    try {
      const res = await fetch('https://blob.vercel-storage.com/debug-test.txt?random=1', {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'x-content-type': 'text/plain',
          'x-add-random-suffix': '1',
          'x-api-version': '7',
        },
        body: 'test',
      })
      testResult = {
        status: res.status,
        body: await res.text(),
      }
    } catch (e: any) {
      testResult = { error: e.message }
    }
  }

  return NextResponse.json({
    hasToken,
    tokenPrefix,
    tokenSuffix,
    testResult,
  })
}
