"""Python serial number generator."""

from collections import Counter

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        """Create counter, starting at start"""
        self.start = self.next = start
        
    
    def generate(self):
        #Return next number in series
        self.next = self.next + 1
        return self.next -1
    
    def reset(self):
        """Reset to original start"""
        self.next = self.start