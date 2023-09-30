import random

class WordFinder:
    """Word Finder: finds random words from a dictionary.
    >>> wf = WordFinder("simple.text)
    3 words read
    
    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
    
    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
    
    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
    """
    
    def __init__ (self, file_name):
        """constructor for class"""
        file = open(file_name)
        self.in_file = self.parse(file)
        print(f"{len(self.in_file)} words read")
         
        
    def parse(self, file):
        """parse file_name into in_file"""
        return [w.strip() for w in file]

        
    def get_random_word(self,):
        """return random word"""
        return random.choice(self.in_file)
    
class SpecialWordsFinder(WordFinder):
    ...