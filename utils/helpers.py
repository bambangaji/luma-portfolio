def calculate_checksum(data: str) -> str:
    """Calculates a simple SHA256 checksum for the given string."""
    import hashlib
    return hashlib.sha256(data.encode('utf-8')).hexdigest()