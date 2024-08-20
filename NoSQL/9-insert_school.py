#!/usr/bin/env python3
""" Module to insert a new document in a collection based on kwargs """

from pymongo import MongoClient

def insert_school(mongo_collection, **kwargs):
    """
    Insert a new document in a collection based on kwargs.
    """
    # Insert the new document and get the result
    result = mongo_collection.insert_one(kwargs)
    # Return the _id of the new document
    return result.inserted_id
