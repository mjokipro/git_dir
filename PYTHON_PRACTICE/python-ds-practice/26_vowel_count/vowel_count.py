VOWELS = set("aeiou")

def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    phrase = phrase.lower()
    new_dict = {}
    
    for l in phrase:
        if l in VOWELS:
            new_dict[l] = new_dict.get(l, 0) + 1
            
    return new_dict