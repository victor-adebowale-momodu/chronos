from datetime import datetime

from pydantic import BaseModel


class SessionCreate(BaseModel):
    start_datetime: datetime
    end_datetime: datetime
    set_duration: int
