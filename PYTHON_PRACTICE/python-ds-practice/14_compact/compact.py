def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    true_list = []
    false_list = []

    for val in lst:
        if fn(val):
            true_list.append(val)
        else:
            false_list.append(val)

    return [true_list, false_list]