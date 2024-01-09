## Internet
- The internet is just a really really big network, made up of many smaller local networks

## IP addresses
- IP addresses look like `123.77.32.121`, four numbers (0-255) connected by dots.
- Some computers have multiple IP addresses they can be reached by
	- If they have more than 1 way to talk to the world 
		- ethernet
		- wifi
		- localhost
- under some circumstances, multiple computers can share an IP address and have this be handled by a special kind of router. If you’re interested in system administration details, you can learn about this by reading about “Network Address Translation”.
- Original idea was for every computer to have it’s own IP. But this was designed to handle 50 computers, and we ran out of unique numbers.
- ISP (internet service provider)‘s router has a true unique IP address.
	- Everything else on that router’s network (toaster, laptop, etc.) gets a “fake” IP address
		- `192.168.x.x`
		- `10.x.x.x`
	- This ‘IP’ is only meaningful inside the network.
- IPv4 is the current system
- IPv6 is the future system to never run out of unique numbers

### IPv6
- another whole way to specify networks that uses a different numbering scheme

## 127.0.0.1
- `127.0.0.1` is special — it’s “this computer that you’re on”
	- Computer is talking to itself
- In addition to their IP address on the network, all computers can reach themselves at this address.
- The name localhost always maps to `127.0.0.1`.