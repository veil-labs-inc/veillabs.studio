"""Local dev server with SPA fallback — serves index.html for unknown routes."""
import http.server
import os

ROOT = os.path.dirname(os.path.abspath(__file__))

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        # Serve the actual file if it exists, otherwise fall back to index.html
        path = self.translate_path(self.path)
        if not os.path.exists(path) or (os.path.isdir(path) and not os.path.exists(os.path.join(path, "index.html"))):
            self.path = "/index.html"
        return super().do_GET()

if __name__ == "__main__":
    port = 8080
    with http.server.HTTPServer(("", port), SPAHandler) as srv:
        print(f"Serving at http://localhost:{port}  (SPA mode)")
        srv.serve_forever()
