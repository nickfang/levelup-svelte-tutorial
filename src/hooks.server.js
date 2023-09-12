import { sequence } from '@sveltejs/kit/hooks'
import { auth } from '$db/fakeAuth';

async function logger({ event, resolve }) {
  const startTime = Date.now();
  const response = await resolve(event)
  console.log(`${Date.now() - startTime}ms ${event.request.method} ${event.url.pathname}`);

  return response
}

function authorize({ event, resolve }) {
  const user = auth();
  event.locals.user = user;

  return resolve(event)
}

export const handle = sequence(logger, authorize);

// Intercept fetch
export function handleFetch({ request, fetch }) {
  return fetch(request)
}

// Intercept errors
export function handleError({ error, event }) {
  console.log(error)
  return {
    message: 'Oops, intercepting in a hook',
    code: error.code,
  }
}