// Hand-written to match supabase/migrations/20260727000001_core_schema.sql and
// 20260727000002_rls_policies.sql (no local Docker/podman available to run the
// usual `supabase gen types` introspection). Regenerate with:
//   supabase gen types typescript --db-url "<connection-string>" --schema public
// if the schema changes and Docker/podman becomes available.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      room_types: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          max_occupancy: number | null;
          default_rate: number | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          max_occupancy?: number | null;
          default_rate?: number | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["room_types"]["Insert"]>;
        Relationships: [];
      };
      rooms: {
        Row: {
          id: string;
          room_type_id: string;
          room_number: string;
          is_active: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          room_number: string;
          is_active?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["rooms"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "rooms_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      guests: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          email: string | null;
          id_proof_type: string | null;
          id_proof_number: string | null;
          id_proof_front_path: string | null;
          id_proof_back_path: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone?: string | null;
          email?: string | null;
          id_proof_type?: string | null;
          id_proof_number?: string | null;
          id_proof_front_path?: string | null;
          id_proof_back_path?: string | null;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["guests"]["Insert"]>;
        Relationships: [];
      };
      staff_profiles: {
        Row: {
          id: string;
          full_name: string;
          role: "owner" | "frontdesk" | "accountant";
          phone: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role: "owner" | "frontdesk" | "accountant";
          phone?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["staff_profiles"]["Insert"]>;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          booking_reference: string;
          guest_id: string;
          check_in_at: string;
          check_out_at: string;
          num_guests: number | null;
          status: "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show";
          source: "phone" | "whatsapp" | "walk_in" | null;
          notes: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_reference?: string;
          guest_id: string;
          check_in_at: string;
          check_out_at: string;
          num_guests?: number | null;
          status?: "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show";
          source?: "phone" | "whatsapp" | "walk_in" | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "bookings_guest_id_fkey";
            columns: ["guest_id"];
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "staff_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      booking_rooms: {
        Row: {
          id: string;
          booking_id: string;
          room_id: string;
          room_type_id: string;
          rate: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          room_id: string;
          room_type_id: string;
          rate?: number | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["booking_rooms"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "booking_rooms_booking_id_fkey";
            columns: ["booking_id"];
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "booking_rooms_room_id_fkey";
            columns: ["room_id"];
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "booking_rooms_room_type_id_fkey";
            columns: ["room_type_id"];
            referencedRelation: "room_types";
            referencedColumns: ["id"];
          },
        ];
      };
      tax_rates: {
        Row: {
          id: string;
          name: string;
          rate_percent: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          rate_percent: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tax_rates"]["Insert"]>;
        Relationships: [];
      };
      invoices: {
        Row: {
          id: string;
          invoice_number: string;
          booking_id: string;
          guest_id: string;
          issue_date: string;
          due_date: string | null;
          status: "draft" | "issued" | "paid" | "partially_paid" | "void";
          subtotal: number;
          tax_total: number;
          grand_total: number;
          amount_paid: number;
          balance_due: number;
          gst_number: string | null;
          notes: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          invoice_number: string;
          booking_id: string;
          guest_id: string;
          issue_date?: string;
          due_date?: string | null;
          status?: "draft" | "issued" | "paid" | "partially_paid" | "void";
          subtotal?: number;
          tax_total?: number;
          grand_total?: number;
          amount_paid?: number;
          balance_due?: number;
          gst_number?: string | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey";
            columns: ["booking_id"];
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoices_guest_id_fkey";
            columns: ["guest_id"];
            referencedRelation: "guests";
            referencedColumns: ["id"];
          },
        ];
      };
      invoice_line_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          unit_price: number;
          tax_rate_id: string | null;
          line_subtotal: number;
          line_tax: number;
          line_total: number;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          description: string;
          quantity?: number;
          unit_price: number;
          tax_rate_id?: string | null;
          line_subtotal: number;
          line_tax?: number;
          line_total: number;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["invoice_line_items"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey";
            columns: ["invoice_id"];
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invoice_line_items_tax_rate_id_fkey";
            columns: ["tax_rate_id"];
            referencedRelation: "tax_rates";
            referencedColumns: ["id"];
          },
        ];
      };
      payments: {
        Row: {
          id: string;
          invoice_id: string;
          amount: number;
          payment_method: string | null;
          paid_at: string;
          reference_note: string | null;
          recorded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          amount: number;
          payment_method?: string | null;
          paid_at?: string;
          reference_note?: string | null;
          recorded_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey";
            columns: ["invoice_id"];
            referencedRelation: "invoices";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_recorded_by_fkey";
            columns: ["recorded_by"];
            referencedRelation: "staff_profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_staff_role: {
        Args: Record<string, never>;
        Returns: string | null;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
