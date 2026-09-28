from pathlib import Path

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)


router = APIRouter(
    prefix="/attachments",
    tags=["Attachments"]
)


UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/{bug_id}")
async def upload_attachment(
    bug_id: int,
    file: UploadFile = File(...)
):

    file_path = UPLOAD_DIR / file.filename

    content = await file.read()

    with open(file_path, "wb") as f:
        f.write(content)

    return {
        "message": "File uploaded",
        "filename": file.filename,
        "bug_id": bug_id
    }