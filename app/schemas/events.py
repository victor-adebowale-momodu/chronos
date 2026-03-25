from datetime import datetime

from pydantic import BaseModel
from pydantic.functional_validators import field_validator

from app.models import EventType


class Event(BaseModel):
    timestamp: datetime
    event_type: EventType


class SessionEventsCreate(BaseModel):
    events: list[Event]

    @field_validator("events")
    @classmethod
    def events_must_not_be_empty(cls, v):
        if not v:
            raise ValueError("events list cannot be empty")
        return v
