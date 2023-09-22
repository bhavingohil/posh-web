export default async function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    "accessToken=; HttpOnly; Secure; SameSite=Strict; Expires=-1"
  );

  res.send("Success");
}
