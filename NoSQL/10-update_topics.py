#!/usr/bin/env python3
""" Module for updating topics of a school document based on the school name """

from pymongo import MongoClient

def update_topics(mongo_collection, name, topics):
    """
    Updates the topics of a school document.
    """
    # Using update_many to update all matching documents
    mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
