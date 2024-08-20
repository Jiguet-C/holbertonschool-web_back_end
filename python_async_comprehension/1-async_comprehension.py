#!/usr/bin/env python3

""" Let's execute multiple coroutines at the same time with async """

import typing
async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> typing.List[float]:
    """
    Collect 10 random numbers using an async
    comprehensing over async_generator
    """
    random_numbers = [number async for number in async_generator()]
    return random_numbers[:10]
