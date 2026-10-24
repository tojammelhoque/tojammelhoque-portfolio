/** Finds the visitor's IP address in the headers that hosting platforms add to each request. */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim() // the first address is the visitor's

  return request.headers.get('x-real-ip') ?? 'unknown'
}
