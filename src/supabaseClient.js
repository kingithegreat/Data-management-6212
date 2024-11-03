// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sooctlwgvqqwgypcqksw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvb2N0bHdndnFxd2d5cGNxa3N3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzE2NDY1NSwiZXhwIjoyMDQyNzQwNjU1fQ.kNSfgX2TIlWWccSqBSVe3830C0_GU9epEEMV9KHETr4';
export const supabase = createClient(supabaseUrl, supabaseKey);
