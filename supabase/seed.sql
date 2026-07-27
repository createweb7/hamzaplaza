-- One-time seed of room_types, matching the public site's room categories
-- (src/lib/room-types.ts). Room inventory (individual room numbers) is managed
-- via /admin/rooms-admin since the exact type-per-room-number mapping needs
-- owner confirmation (see plan open question #2/#6).

insert into room_types (slug, name, description, sort_order) values
  ('single-room', 'Single Room', 'Cozy & budget-friendly single-occupancy room.', 1),
  ('kitchen-room', 'Kitchen-Attached Room', 'Private room with an attached kitchenette.', 2),
  ('1bhk-room', '1 BHK Room', 'Self-contained one-bedroom set-up with a living area.', 3),
  ('suite-2bhk', '2 BHK Suite Room', 'Two private bedrooms sharing a common living area.', 4),
  ('twin-bedroom', 'Twin Bedroom', 'Multiple configurations available for groups.', 5)
on conflict (slug) do nothing;
