export function notFound(req, res) {
  res.status(404).json({ message: "NO Route Found" });
}