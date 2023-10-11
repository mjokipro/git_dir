import arithmetic
from unittest import TestCase

class AdditionTestCase(TestCase):
    """Examples of unit tests."""
    
    def test_adder(self):
        assert arithmetic.adder(2, 3) == 5
        
    def test_adder_2(self):
        self.assertEqual(arithmetic.adder(2, 2), 4)
        self.assertNotEqual(arithmetic.adder(2, 2), 5)