#!/usr/bin/env python3
"""
This module provides a function to calculate the start
and end index for pagination.
"""


def index_range(page, page_size):
    """
    Calculate the start and end index for a page and page size.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)
