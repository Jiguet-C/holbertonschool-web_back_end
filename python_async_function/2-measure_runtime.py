#!/usr/bin/env python3
"""Measure the runtime"""


import time
import asyncio


wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
    Measures the total execution time for wait_n(n, max_delay) and
    returns the average time per task.

    Args:
    n (int): Number of tasks.
    max_delay (int): Maximum delay for each task.

    Returns:
    float: Average execution time per task.
    """
    start_time = time.time()  # Record the start time
    asyncio.run(wait_n(n, max_delay))  # Execute the wait_n function
    end_time = time.time()  # Record the end time

    total_time = end_time - start_time  # Calculate the total time
    return total_time / n  # Return the average time per task
