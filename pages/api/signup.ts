import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, user_id } = req.body;

  if (!email || !user_id) {
    return res.status(400).json({ error: "Missing email or user_id" });
  }

  try {
    // Step 1: Check if user exists
    const { data: existingUser, error: selectError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      // PGRST116 = No rows found (in some Supabase setups) - check your DB error codes
      return res.status(500).json({ error: selectError.message });
    }

    if (existingUser) {
      // User already exists - no duplicate insertion
      return res.status(409).json({ message: "User already exists" });
    }

    // Step 2: Insert new user
    const { data: insertedUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: user_id, // Assuming user_id is your auth user id, and your users table has a matching PK
          email,
          // Add other user fields here if needed
        },
      ]);

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    return res.status(201).json({ message: "User created successfully", user: insertedUser });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
