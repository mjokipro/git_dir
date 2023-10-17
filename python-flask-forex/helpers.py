class Currency:
    """Class for creating list of base country xchange codes"""
    
    def __init__(self, countrys_currency_code):
        """create country code"""
        
        self.currency_code = countrys_currency_code
        
USA = Currency("USD") 
United_Arab_Emirates = Currency("AED")
Albania = Currency("ALL")

# USA = Country("United States", Currency(country_codes_dict["United States Dollar"]))
# United_Arab_Emirates = Country("United Arab Emirates", Currency(country_codes_dict["United Arab Emirates Dirham"]))
# Albania = Country("Albania", Currency(country_codes_dict["Albanian Lek"]))

countries_currency_code = {
    "USD": USA, 
    "AED": United_Arab_Emirates,
    "ALL": Albania,
    }