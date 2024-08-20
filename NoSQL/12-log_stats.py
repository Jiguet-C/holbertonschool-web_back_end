#!/usr/bin/env python3
"""Nginx logs statistics from MongoDB."""

from pymongo import MongoClient

def print_stats():
    """Prints statistics about Nginx logs stored in MongoDB."""
    client = MongoClient('mongodb://127.0.0.1:27017')
    collection = client.logs.nginx

    # Total logs count
    total_logs = collection.count_documents({})
    print(f"{total_logs} logs")

    # Count of different methods
    methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    print("Methods:")
    for method in methods:
        count = collection.count_documents({'method': method})
        print(f"    method {method}: {count}")

    # Count of GET requests to path /status
    status_check = collection.count_documents({'method': 'GET', 'path': '/status'})
    print(f"{status_check} status check")
