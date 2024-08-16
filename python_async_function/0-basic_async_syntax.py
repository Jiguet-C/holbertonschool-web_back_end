#!/usr/bin/env python3
"""The basics of async"""


import asyncio
import random


async def wait_random(max_delay: int = 10) -> float:
    """
    Asynchronous coroutine that waits for a random delay between
    0 and max_delay seconds and eventually returns it
    """
    # Generate a random delay between 0 and max_delay (inclusive)
    delay = random.uniform(0, max_delay)

    # Wait for the generated delay
    await asyncio.sleep(delay)

    # Return the delay
    return delay
