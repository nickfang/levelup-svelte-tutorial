<script>
  import { invalidateAll } from '$app/navigation'
  import { applyAction, deserialize } from '$app/forms'

  export let form;
  $: console.log('form', form);

  // would not be able to do this with an arrow function because of this
  async function handleForm(event) {
    const data = new FormData(this)
    const res = await fetch(this.action, {
      method: 'POST',
      body: data,
    });

    const result = deserialize(await res.text());

    if (result.type === 'success') {
      // Reloads all data
      await invalidateAll()
    }

    // populating form
    // will redirect if thrown redirect in action
    // show error page if thrown error
    applyAction(result)
  }
</script>

{#if form?.errorMessage}
<p>
  {form.errorMessage}
</p>
{/if}

{#if form?.message}
  <p>{form.message}</p>
{:else}
  <!-- <form 
    use:enhance={({ form, data, action }) =>{
      // form: form element
      // data: FormData object
      // action: url form posts to
      // cancel(): cancels form
      return ({ result, update }) => {
        // result: 'ActionResult'
        // update(): runs all of the default use:enhance
        update();
      }
    }}
    action="/contact?/email"
    method="POST"
  > -->
  <form
    on:submit|preventDefault={handleForm}
    action="/contact?/email"
  >
    <label>
      Name: <input type="text" required name="name" id="name"/>
    </label>
    <label>
      Email: <input type="text" required name="email" id="email"/>
    </label>
    <label>
      Message: <textarea required name="message" id="message"/>
    </label>
    <button type="submit">Send Email</button>
</form>
{/if}

<style>
  form {
    padding: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
  }
  label {
    display: block;
  }
</style>