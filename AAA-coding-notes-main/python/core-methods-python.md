## String Core Methods

<table><colgroup><col width="26%"> <col width="74%"></colgroup><tbody><tr><td><code><span>s.count(t)</span></code></td><td>Returns # times <cite>t</cite> occurs in <cite>s</cite></td></tr><tr><td><code><span>s.endswith(st)</span></code></td><td>Does <cite>s</cite> end with string <cite>t</cite>?</td></tr><tr><td><code><span>s.find(t)</span></code></td><td>Index of first occurrence of <cite>t</cite> in <cite>s</cite> (-1 for failure)</td></tr><tr><td><code><span>s.isdigit()</span></code></td><td>Is <cite>s</cite> entirely made up of digits?</td></tr><tr><td><code><span>s.join(seq)</span></code></td><td>Make new string of <cite>seq</cite> joined by <cite>s</cite> (<code><span>"|".join(nums)</span></code>)</td></tr><tr><td><code><span>s.lower()</span></code></td><td>Return lowercase copy of <cite>s</cite></td></tr><tr><td><code><span>s.replace(t,u,count)</span></code></td><td>Replace <cite>count</cite> (default: all) occurrences of <cite>t</cite> in <cite>s</cite> with <cite>u</cite></td></tr><tr><td><code><span>s.split(sep)</span></code></td><td>Return list of items made from splitting <cite>s</cite> on <cite>sep</cite></td></tr><tr><td><code><span>s.splitlines()</span></code></td><td>Split <cite>s</cite> at newlines</td></tr><tr><td><code><span>s.startswith(t)</span></code></td><td>Does <cite>s</cite> start with <cite>t</cite>?</td></tr><tr><td><code><span>s.strip()</span></code></td><td>Remove whitespace (including newlines) at start/end of <cite>s</cite></td></tr></tbody></table>


## List Core Methods

<table><colgroup><col width="31%"> <col width="69%"></colgroup><tbody><tr><td><code><span>l.append(x)</span></code></td><td>Add <cite>x</cite> to end of of list</td></tr><tr><td><code><span>l.copy()</span></code></td><td>Return shallow copy of list <cite>l</cite></td></tr><tr><td><code><span>l.count(x)</span></code></td><td>Return # times <cite>x</cite> appears in <cite>l</cite></td></tr><tr><td><code><span>l.extend(l2)</span></code></td><td>Add items of <cite>l2</cite> to <cite>l</cite></td></tr><tr><td><code><span>l.index(x)</span></code></td><td>Return (0-based) index of <cite>x</cite> in <cite>l</cite></td></tr><tr><td><code><span>l.insert(i,</span> <span>x)</span></code></td><td>Insert <cite>x</cite> at position <cite>i</cite></td></tr><tr><td><code><span>l.pop(i)</span></code></td><td>Remove &amp; return item at <cite>i</cite> (default last)</td></tr><tr><td><code><span>l.reverse()</span></code></td><td>Reverse list (change in place)</td></tr><tr><td><code><span>l.sort()</span></code></td><td>Sort list in place</td></tr></tbody></table>


## Dictionary Core Methods

<table><colgroup><col width="28%"> <col width="72%"></colgroup><tbody><tr><td><code><span>d.copy()</span></code></td><td>Return new copy of <cite>d</cite></td></tr><tr><td><code><span>d.get(x,</span> <span>default)</span></code></td><td>Return value of <cite>x</cite> (or optional <cite>default</cite> if missing)</td></tr><tr><td><code><span>d.items()</span></code></td><td>Return iterable of (key, value) pairs</td></tr><tr><td><code><span>d.keys()</span></code></td><td>Return iterable of keys</td></tr><tr><td><code><span>d.values()</span></code></td><td>Return iterable of values</td></tr></tbody></table>


## Set Core Methods

<table><colgroup><col width="28%"> <col width="72%"></colgroup><tbody><tr><td><code><span>set.add(x)</span></code></td><td>Add item <cite>x</cite> to <cite>set</cite></td></tr><tr><td><code><span>set.copy()</span></code></td><td>Make new copy of <cite>set</cite></td></tr><tr><td><code><span>set.pop()</span></code></td><td>Remove &amp; return arbitrary item from <cite>set</cite></td></tr><tr><td><code><span>set.remove(x)</span></code></td><td>Remove <cite>x</cite> from <cite>set</cite></td></tr></tbody></table>

- @ Note on set.pop():
	- Because sets are unordered, this randomly returns arbitrary item
	- This is useful for when you have to do an operation to each item in a set, and want to ensure you only do that operation once per item