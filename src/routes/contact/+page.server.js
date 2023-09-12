import { fail } from '@sveltejs/kit';

// if there's a default action, you can't have named actions.  Otherwise you can have as many named actions as you want.
export const actions = {
  email: async ({ locals, request}) => {
    if (!locals?.user?.roles?.includes('admin'))
      return fail(401, {
        errorMessage: 'Un-Authorized',
      })

    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    console.log(name, email, message);

    return {
      message: 'Email Sent!',
    };
  },
  test: () => {
    console.log('hit test action');
  }
};