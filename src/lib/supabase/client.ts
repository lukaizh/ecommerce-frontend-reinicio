import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swzzocuudxtyuemsammg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3enpvY3V1ZHh0eXVlbXNhbW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0MzI3NzYsImV4cCI6MjAwMDAwODc3Nn0.Qg-Vk9Y9lkIUzrSt9rQSfkk0KA7YqMPJUIl2UJJkNIQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
