// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://epslvgyorimzqsvospkv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwc2x2Z3lvcmltenFzdm9zcGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDE1MTQsImV4cCI6MjA2MzU3NzUxNH0.uco1B_JVGnSmgONrqgPRWq7kYmxQmPLZ7yGSlwjh5B8'

export const supabase = createClient(supabaseUrl, supabaseKey)
