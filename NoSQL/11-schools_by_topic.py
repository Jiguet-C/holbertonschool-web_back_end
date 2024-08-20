#!/usr/bin/env python3
"""
Module for finding schools with a specific topic in a MongoDB collection
"""

from pymongo import MongoClient

def schools_by_topic(mongo_collection, topic):
    """
    Finds all schools in the collection that have a specific topic.
    """
    # Query the collection for schools with the specified topic
    schools = mongo_collection.find({"topics": topic})
    return list(schools)
