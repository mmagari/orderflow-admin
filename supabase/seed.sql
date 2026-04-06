insert into orders (
  id,
  order_number,
  customer_name,
  customer_email,
  customer_phone,
  shipping_address,
  status,
  payment_method,
  total_amount,
  created_at
)
values
  ('1', 'ORD-1001', 'Anna Kowalska', 'anna@example.com', '+48 500 100 100', '12 Zielona Street, Warsaw, Poland', 'pending', 'card', 249.99, '2026-03-28T10:15:00Z'),
  ('2', 'ORD-1002', 'Jan Nowak', 'jan@example.com', '+48 500 200 200', '8 Lipowa Avenue, Kraków, Poland', 'paid', 'paypal', 399.50, '2026-03-27T08:20:00Z'),
  ('3', 'ORD-1003', 'Maria Wiśniewska', 'maria@example.com', '+48 500 300 300', '21 Słoneczna Street, Gdańsk, Poland', 'shipped', 'card', 129.00, '2026-03-26T14:45:00Z'),
  ('4', 'ORD-1004', 'Piotr Zieliński', 'piotr@example.com', '+48 500 400 400', '5 Brzozowa Street, Poznań, Poland', 'delivered', 'cash', 89.99, '2026-03-25T11:00:00Z'),
  ('5', 'ORD-1005', 'Katarzyna Lewandowska', 'kasia@example.com', '+48 500 500 500', '44 Leśna Street, Wrocław, Poland', 'cancelled', 'paypal', 560.00, '2026-03-24T16:10:00Z'),
  ('6', 'ORD-1006', 'Tomasz Kamiński', 'tomasz@example.com', '+48 500 600 600', '3 Polna Street, Łódź, Poland', 'pending', 'card', 74.99, '2026-03-23T09:30:00Z');

insert into order_items (
  id,
  order_id,
  product_name,
  quantity,
  unit_price
)
values
  ('1-1', '1', 'Minimal Chair', 1, 149.99),
  ('1-2', '1', 'Wall Lamp', 2, 50.00),
  ('2-1', '2', 'Oak Desk', 1, 399.50),
  ('3-1', '3', 'Ceramic Vase', 3, 43.00),
  ('4-1', '4', 'Coffee Table', 1, 89.99),
  ('5-1', '5', 'Bookshelf', 2, 280.00),
  ('6-1', '6', 'Desk Organizer', 1, 24.99),
  ('6-2', '6', 'Notebook Set', 2, 25.00);