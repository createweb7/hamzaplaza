-- Row Level Security. Default boundary (confirm with owner, see plan open question #3):
--   owner/frontdesk: full read/write on rooms, guests, bookings, booking_rooms.
--   accountant: read-only on rooms, guests, bookings, booking_rooms.
--   owner/accountant: full read/write on tax_rates, invoices, invoice_line_items, payments.
--   frontdesk: no access to financial tables.
--   staff_profiles: readable by any staff member, writable only by owner.

create function current_staff_role() returns text as $$
  select role from staff_profiles where id = auth.uid() and is_active
$$ language sql stable security definer set search_path = public;

alter table room_types enable row level security;
alter table rooms enable row level security;
alter table guests enable row level security;
alter table bookings enable row level security;
alter table booking_rooms enable row level security;
alter table tax_rates enable row level security;
alter table invoices enable row level security;
alter table invoice_line_items enable row level security;
alter table payments enable row level security;
alter table staff_profiles enable row level security;

-- room_types / rooms: all staff can read, only owner/frontdesk can write.
create policy "staff can read room_types" on room_types
  for select to authenticated using (current_staff_role() is not null);
create policy "owner/frontdesk can write room_types" on room_types
  for all to authenticated
  using (current_staff_role() in ('owner', 'frontdesk'))
  with check (current_staff_role() in ('owner', 'frontdesk'));

create policy "staff can read rooms" on rooms
  for select to authenticated using (current_staff_role() is not null);
create policy "owner/frontdesk can write rooms" on rooms
  for all to authenticated
  using (current_staff_role() in ('owner', 'frontdesk'))
  with check (current_staff_role() in ('owner', 'frontdesk'));

-- guests / bookings / booking_rooms: owner/frontdesk read-write, accountant read-only.
create policy "staff can read guests" on guests
  for select to authenticated using (current_staff_role() is not null);
create policy "owner/frontdesk can write guests" on guests
  for all to authenticated
  using (current_staff_role() in ('owner', 'frontdesk'))
  with check (current_staff_role() in ('owner', 'frontdesk'));

create policy "staff can read bookings" on bookings
  for select to authenticated using (current_staff_role() is not null);
create policy "owner/frontdesk can write bookings" on bookings
  for all to authenticated
  using (current_staff_role() in ('owner', 'frontdesk'))
  with check (current_staff_role() in ('owner', 'frontdesk'));

create policy "staff can read booking_rooms" on booking_rooms
  for select to authenticated using (current_staff_role() is not null);
create policy "owner/frontdesk can write booking_rooms" on booking_rooms
  for all to authenticated
  using (current_staff_role() in ('owner', 'frontdesk'))
  with check (current_staff_role() in ('owner', 'frontdesk'));

-- tax_rates / invoices / invoice_line_items / payments: owner/accountant only, frontdesk has no access.
create policy "owner/accountant can read tax_rates" on tax_rates
  for select to authenticated using (current_staff_role() in ('owner', 'accountant'));
create policy "owner/accountant can write tax_rates" on tax_rates
  for all to authenticated
  using (current_staff_role() in ('owner', 'accountant'))
  with check (current_staff_role() in ('owner', 'accountant'));

create policy "owner/accountant can read invoices" on invoices
  for select to authenticated using (current_staff_role() in ('owner', 'accountant'));
create policy "owner/accountant can write invoices" on invoices
  for all to authenticated
  using (current_staff_role() in ('owner', 'accountant'))
  with check (current_staff_role() in ('owner', 'accountant'));

create policy "owner/accountant can read invoice_line_items" on invoice_line_items
  for select to authenticated using (current_staff_role() in ('owner', 'accountant'));
create policy "owner/accountant can write invoice_line_items" on invoice_line_items
  for all to authenticated
  using (current_staff_role() in ('owner', 'accountant'))
  with check (current_staff_role() in ('owner', 'accountant'));

create policy "owner/accountant can read payments" on payments
  for select to authenticated using (current_staff_role() in ('owner', 'accountant'));
create policy "owner/accountant can write payments" on payments
  for all to authenticated
  using (current_staff_role() in ('owner', 'accountant'))
  with check (current_staff_role() in ('owner', 'accountant'));

-- staff_profiles: any staff member can read the roster, only owner can write.
create policy "staff can read staff_profiles" on staff_profiles
  for select to authenticated using (current_staff_role() is not null);
create policy "owner can write staff_profiles" on staff_profiles
  for all to authenticated
  using (current_staff_role() = 'owner')
  with check (current_staff_role() = 'owner');
