#!/usr/bin/env python3
""" Module to list all documents in a MongoDB collection """

from pymongo import MongoClient

def list_all(mongo_collection):
    """
    Lists all documents in a MongoDB collection.
    """
    # Use the find method to get all documents
    documents = mongo_collection.find()

    # Convert the cursor to a list
    return list(documents) if documents else []
