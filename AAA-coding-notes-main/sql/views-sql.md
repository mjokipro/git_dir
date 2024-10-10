## Views

- Views create a shorthand for an on-demand command that you can run to get a custom desired table.

example command that you want to save in a view:
```sql
SELECT customer_id, orders.id, SUM(price) FROM orders JOIN items ON orders.id = items.order_id GROUP BY orders.id;
```

![[view-1678846182146.jpeg]]

syntax to save it in a view:
```sql
create view order_report AS SELECT customer_id, orders.id, SUM(price) FROM orders JOIN items ON orders.id = items.order_id GROUP BY orders.id;
```
- Notice how you save the command on the right hand side of the AS
	- It’s like AS in this case is functioning as an = operator and saving that command as the value to the variable of the view ‘order_report’

syntax to use this view:
```sql
SELECT * FROM order_report
```
- You could select whichever columns you wanted though, doesn’t have to be `*`

gives you the table:
![[view-1678846361574.jpeg]]
- & BUT much easier faster syntax! 
