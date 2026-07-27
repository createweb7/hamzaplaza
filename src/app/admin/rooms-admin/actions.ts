"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createRoom(formData: FormData) {
  const roomNumber = String(formData.get("room_number") ?? "").trim();
  const roomTypeId = String(formData.get("room_type_id") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!roomNumber || !roomTypeId) {
    throw new Error("Room number and room type are required.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("rooms").insert({
    room_number: roomNumber,
    room_type_id: roomTypeId,
    notes: notes || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/rooms-admin");
}

export async function setRoomActive(roomId: string, isActive: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("rooms").update({ is_active: isActive }).eq("id", roomId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/rooms-admin");
}
