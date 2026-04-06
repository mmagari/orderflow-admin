create table if not exists orders (
  id text primary key,
  order_number text not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  shipping_address text not null,
  status text not null check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  payment_method text not null check (payment_method in ('card', 'paypal', 'cash')),
  total_amount numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id text primary key,
  order_id text not null references orders(id) on delete cascade,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0)
);