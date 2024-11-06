import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sooctlwgvqqwgypcqksw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvb2N0bHdndnFxd2d5cGNxa3N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxNjQ2NTUsImV4cCI6MjA0Mjc0MDY1NX0.rSe2iiXuHiU4EAPiVyftM8VEj6O2F1TaGC9zEF_Rj8U';
export const supabase = createClient(supabaseUrl, supabaseKey);
