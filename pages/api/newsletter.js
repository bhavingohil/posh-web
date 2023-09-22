import sendgrid from "@sendgrid/client";

const sendgrid_key = process.env.SENDGRID_KEY || "";
sendgrid.setApiKey(sendgrid_key);

export default async function handler(req, res) {
  const email = req.body?.email;
  if (!email) {
    return res.json({ success: "false", message: "Missing information" });
  }
  const data = {
    contacts: [
      {
        email: email,
      },
    ],
  };
  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };
  try {
    await sendgrid.request(request);
    return res.json({ success: true });
  } catch (e) {
    console.log("error saving contact to newsletter", e);
  }
  return res.json({ success: false, message: "Internal server error" });
}
