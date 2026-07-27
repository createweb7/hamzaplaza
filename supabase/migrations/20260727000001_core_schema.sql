-- Core schema: room inventory, guests, bookings, invoicing, staff.
-- See /Users/mahadeer/.claude/plans/federated-inventing-volcano.md for the full data model rationale.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- room_types / rooms
-- ---------------------------------------------------------------------------

create table room_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  max_occupancy int,
  default_rate numeric(10, 2),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table rooms (
  id uuid primary key default gen_random_uuid(),
  room_type_id uuid not null references room_types (id) on delete restrict,
  room_number text not null unique,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index rooms_room_type_id_idx on rooms (room_type_id);

-- ---------------------------------------------------------------------------
-- guests
-- ---------------------------------------------------------------------------

create table guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  id_proof_type text,
  id_proof_number text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index guests_phone_idx on guests (phone);

-- ---------------------------------------------------------------------------
-- staff_profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------

create table staff_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('owner', 'frontdesk', 'accountant')),
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- bookings / booking_rooms
-- ---------------------------------------------------------------------------

create table bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique,
  guest_id uuid not null references guests (id) on delete restrict,
  check_in_at timestamptz not null,
  check_out_at timestamptz not null,
  num_guests int,
  status text not null default 'confirmed'
    check (status in ('confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')),
  source text check (source in ('phone', 'whatsapp', 'walk_in')),
  notes text,
  created_by uuid references staff_profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_dates_check check (check_out_at > check_in_at)
);

create index bookings_guest_id_idx on bookings (guest_id);
create index bookings_check_in_at_idx on bookings (check_in_at);
create index bookings_status_idx on bookings (status);

create table booking_rooms (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings (id) on delete cascade,
  room_id uuid not null references rooms (id) on delete restrict,
  room_type_id uuid not null references room_types (id),
  rate numeric(10, 2),
  created_at timestamptz not null default now()
);

create index booking_rooms_booking_id_idx on booking_rooms (booking_id);
create index booking_rooms_room_id_idx on booking_rooms (room_id);

-- ---------------------------------------------------------------------------
-- tax_rates
-- ---------------------------------------------------------------------------

create table tax_rates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rate_percent numeric(5, 2) not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- invoices / invoice_line_items / payments
-- ---------------------------------------------------------------------------

create table invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  booking_id uuid not null references bookings (id) on delete restrict,
  guest_id uuid not null references guests (id) on delete restrict,
  issue_date date not null default current_date,
  due_date date,
  status text not null default 'draft'
    check (status in ('draft', 'issued', 'paid', 'partially_paid', 'void')),
  subtotal numeric(10, 2) not null default 0,
  tax_total numeric(10, 2) not null default 0,
  grand_total numeric(10, 2) not null default 0,
  amount_paid numeric(10, 2) not null default 0,
  balance_due numeric(10, 2) not null default 0,
  gst_number text,
  notes text,
  created_by uuid references staff_profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index invoices_booking_id_idx on invoices (booking_id);
create index invoices_guest_id_idx on invoices (guest_id);
create index invoices_status_idx on invoices (status);

create table invoice_line_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices (id) on delete cascade,
  description text not null,
  quantity numeric(10, 2) not null default 1,
  unit_price numeric(10, 2) not null,
  tax_rate_id uuid references tax_rates (id),
  line_subtotal numeric(10, 2) not null,
  line_tax numeric(10, 2) not null default 0,
  line_total numeric(10, 2) not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index invoice_line_items_invoice_id_idx on invoice_line_items (invoice_id);

create table payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices (id) on delete restrict,
  amount numeric(10, 2) not null,
  payment_method text,
  paid_at timestamptz not null default now(),
  reference_note text,
  recorded_by uuid references staff_profiles (id),
  created_at timestamptz not null default now()
);

create index payments_invoice_id_idx on payments (invoice_id);

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------

create function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on room_types
  for each row execute function set_updated_at();
create trigger set_updated_at before update on rooms
  for each row execute function set_updated_at();
create trigger set_updated_at before update on guests
  for each row execute function set_updated_at();
create trigger set_updated_at before update on staff_profiles
  for each row execute function set_updated_at();
create trigger set_updated_at before update on bookings
  for each row execute function set_updated_at();
create trigger set_updated_at before update on invoices
  for each row execute function set_updated_at();
