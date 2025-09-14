export function checkAuth(req: Request) {
  const token = req.headers.get("authorization");
  return token === "my-secret-token"; // simple token for demo
}