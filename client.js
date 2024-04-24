import { createClient } from '@supabase/supabase-js'

const URL = 'https://sevnaoowmazkqboitkqa.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldm5hb293bWF6a3Fib2l0a3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzOTQ4NTUsImV4cCI6MjAyODk3MDg1NX0.7R8N7fLpJkhuU7I9dCbMhw1PmOwIfRQUz1zT61Su6QI';

export const supabase = createClient(URL, API_KEY);