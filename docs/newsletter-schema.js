/* eslint-disable no-console */
/*  */
fetch('/api/dataentities/NL/schemas/newsletter', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/ json', Accept: 'application/json' },
  body: JSON.stringify({
    title: 'Newsletter',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        title: 'Email address',
      },
    },
    required: ['email'],
    'v-security': {
      publicJsonSchema: true,
      allowGetAll: false,
      publicWrite: ['email'],
    },
  }),
})
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.log(err))

// Script para consulta da Entity. Deve ter o valor enviado acima
/* fetch('/api/dataentities/NL/schemas', {
  method: 'GET',
  headers: { 'Content-Type': 'application/ json', Accept: 'application/json' },
})
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.log(err)) */
