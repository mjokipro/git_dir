
### Error 512
- Updated postgresql and encountered this error when trying to start database:![[postgresql-1674003571839.jpeg]]

- `$ brew services`  will show status of databases, which showed this 512 error
- To fix:
	- Reviewed `brew list` to see all formulae
	- Ran `brew uninstall postgresql` and `brew unpin postgresql` (homebrew warned for need to unpin before uninstalling)
	- Ran `brew uninstall postgresql@10` to uninstall previous version of postgresql
	- Ran `brew --prefix` and got output of `/usr/local`
	- Ran  ‘$ls /usr/local/var’  and saw the following output:
	  ![[postgresql-1674004936448.jpeg]]
	-  Ran `$cd /usr/local/var` and then `$rm -rf postgresql/`
	- Then ran `$rm -rf postgresql@10 postgresql@14`, and now have this output with ls:
	  ![[postgresql-1674005147139.jpeg]]
	-  Then reinstalled postgresql@14 with `$brew install postgresql@14`
	- But encountered this error when trying to start postgresql with `$brew services start postgresql`
	  ![[postgresql-1674007075645.jpeg]]
	- Then ran `pg_ctl -D /usr/local/var/postgres stop`  and `pg_ctl -D /usr/local/var/postgres start`, but got an error that the directory does not exist
	- `$ls` to list out folders and found directory `postgresql@14/`
	- Ran `$pg_ctl -D /usr/local/var/postgresql@14 stop` and `pg_restart`
	- AND SUCCESS!
![[postgresql-1674007163035.jpeg]]
