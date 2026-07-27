alter table guests
  add column id_proof_front_path text,
  add column id_proof_back_path text;

insert into storage.buckets (id, name, public)
values ('id-proofs', 'id-proofs', false)
on conflict (id) do nothing;

create policy "staff can read id proof images" on storage.objects
  for select to authenticated
  using (bucket_id = 'id-proofs' and current_staff_role() is not null);

create policy "owner/frontdesk can upload id proof images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'id-proofs' and current_staff_role() in ('owner', 'frontdesk'));

create policy "owner/frontdesk can update id proof images" on storage.objects
  for update to authenticated
  using (bucket_id = 'id-proofs' and current_staff_role() in ('owner', 'frontdesk'))
  with check (bucket_id = 'id-proofs' and current_staff_role() in ('owner', 'frontdesk'));

create policy "owner/frontdesk can delete id proof images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'id-proofs' and current_staff_role() in ('owner', 'frontdesk'));
