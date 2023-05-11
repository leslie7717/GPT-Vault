import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cohjeduincxdnssavdsk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaGplZHVpbmN4ZG5zc2F2ZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1ODU3NTgsImV4cCI6MTk5NjE2MTc1OH0.gmP7OgVpCPJH1XQXG35riN8dpLKB4lI2TGGpzw5HbF0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
