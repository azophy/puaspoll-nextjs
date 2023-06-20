export default async function validateRecaptcha(token:string) {
  const secret_key = process.env.RECAPTCHA_SECRET_KEY
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`

  const res = await fetch(url, {
    method: 'post'
  })
  const google_response = await res.json()
  return (google_response.success == true)
}

