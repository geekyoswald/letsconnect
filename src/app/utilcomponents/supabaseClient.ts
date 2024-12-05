// src/app/utils/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ""; // Add your Supabase URL here
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ""; // Add your Supabase Anon Key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
