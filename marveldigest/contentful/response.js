const contentful = require('contentful')

const client = contentful.createClient({
  space: 's6787rhjsoa7',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'Fdsz9OXe_RQMDl5dNYTdyB9PYQ7lmDtHIC936TMS7-8'
})

client.getEntry('7pvc4lhksv3dezDpMIdiLD')
  .then((entry) => console.log(entry))
  .catch(console.error)

  