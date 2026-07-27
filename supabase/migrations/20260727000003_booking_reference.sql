create sequence booking_reference_seq start with 1;

create function next_booking_reference() returns text as $$
  select 'HRP-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('booking_reference_seq')::text, 4, '0');
$$ language sql;

alter table bookings alter column booking_reference set default next_booking_reference();
