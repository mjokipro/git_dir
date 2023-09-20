def print_upper_words(words):
    
    for word in words:
        if word.startswith("e") or word.startswith("E"):
            print(word.upper())