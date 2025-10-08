export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      brokers: {
        Row: {
          bio: string | null
          brokerage_id: string | null
          business_name: string
          created_at: string | null
          id: string
          is_brokerage_admin: boolean | null
          is_verified: boolean | null
          license_number: string
          phone: string | null
          seat_count: number | null
          service_states: string[]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          brokerage_id?: string | null
          business_name: string
          created_at?: string | null
          id?: string
          is_brokerage_admin?: boolean | null
          is_verified?: boolean | null
          license_number: string
          phone?: string | null
          seat_count?: number | null
          service_states: string[]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          brokerage_id?: string | null
          business_name?: string
          created_at?: string | null
          id?: string
          is_brokerage_admin?: boolean | null
          is_verified?: boolean | null
          license_number?: string
          phone?: string | null
          seat_count?: number | null
          service_states?: string[]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brokers_brokerage_id_fkey"
            columns: ["brokerage_id"]
            isOneToOne: false
            referencedRelation: "brokers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brokers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          downvotes: number | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          parent_post_id: string | null
          title: string
          updated_at: string | null
          upvotes: number | null
          user_id: string | null
          view_count: number | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          parent_post_id?: string | null
          title: string
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          parent_post_id?: string | null
          title?: string
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_parent_post_id_fkey"
            columns: ["parent_post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_votes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
          vote_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
          vote_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
          vote_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          display_name: string | null
          email: string
          email_verified: boolean | null
          full_name: string | null
          id: string
          is_anonymous: boolean | null
          onboarding_completed: boolean | null
          phone: string
          provider: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          display_name?: string | null
          email: string
          email_verified?: boolean | null
          full_name?: string | null
          id: string
          is_anonymous?: boolean | null
          onboarding_completed?: boolean | null
          phone?: string
          provider?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          display_name?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          onboarding_completed?: boolean | null
          phone?: string
          provider?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      rate_submissions: {
        Row: {
          annual_premium: number
          city: string
          coverage_amount: number
          created_at: string | null
          deductible: number | null
          home_age: number | null
          home_type: string | null
          id: string
          insurance_provider: string
          is_verified: boolean | null
          location: unknown
          num_bathrooms: number | null
          num_bedrooms: number | null
          policy_start_date: string | null
          square_footage: number | null
          state: string
          street_address: string
          updated_at: string | null
          user_id: string | null
          zip_code: string
        }
        Insert: {
          annual_premium: number
          city: string
          coverage_amount: number
          created_at?: string | null
          deductible?: number | null
          home_age?: number | null
          home_type?: string | null
          id?: string
          insurance_provider: string
          is_verified?: boolean | null
          location: unknown
          num_bathrooms?: number | null
          num_bedrooms?: number | null
          policy_start_date?: string | null
          square_footage?: number | null
          state: string
          street_address: string
          updated_at?: string | null
          user_id?: string | null
          zip_code: string
        }
        Update: {
          annual_premium?: number
          city?: string
          coverage_amount?: number
          created_at?: string | null
          deductible?: number | null
          home_age?: number | null
          home_type?: string | null
          id?: string
          insurance_provider?: string
          is_verified?: boolean | null
          location?: unknown
          num_bathrooms?: number | null
          num_bedrooms?: number | null
          policy_start_date?: string | null
          square_footage?: number | null
          state?: string
          street_address?: string
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "rate_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_anonymous_username: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      subscription_tier: "basic" | "premium" | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      subscription_tier: ["basic", "premium", "enterprise"],
    },
  },
} as const
