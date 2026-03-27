import logging
import os
import shutil
from pathlib import Path

from jinja2 import Environment, FileSystemLoader

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

SRC = Path("web")
DIST = Path("site")

log.info("Starting build...")
log.info("Source: %s | Output: %s", SRC, DIST)

DIST.mkdir(exist_ok=True)

env = Environment(loader=FileSystemLoader(SRC / "templates"))

pages = os.listdir(SRC / "templates/pages")
log.info("Found %d page(s) to render", len(pages))

for page in pages:
    try:
        template = env.get_template(f"pages/{page}")
        (DIST / page).write_text(template.render())
        log.info("  ✔ Rendered → site/%s", page)
    except Exception as e:
        log.error("  ✘ Failed to render %s: %s", page, e)

src_static = SRC / "static"
dist_static = DIST / "static"

if dist_static.exists():
    shutil.rmtree(dist_static)
    log.info("Cleared old static folder")

shutil.copytree(src_static, dist_static)
log.info(f"Copied static/ → {DIST}/static/")

log.info(f"Build complete → {DIST}/")
