function createSession(uri) {
  window.localStorage.setItem("uri", uri);
  return "OK";
}

function verifySession() {
  let session = window.localStorage.getItem("uri")
  if (session)
    return session
  else
    return 'empty'

}


module.exports = { createSession, verifySession }