#!/usr/bin/env python3
""" function make_multiplier that takes a float multiplier as argument
and returns a function that multiplies a float by multiplier."""


from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """return multiplier"""
    def multiplier_function(value: float) -> float:
        """return multiplier by one number"""
        return value * multiplier

    return multiplier_function
