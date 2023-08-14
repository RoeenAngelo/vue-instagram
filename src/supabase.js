import {createClient} from "@supabase/supabase-js"

const supabaseUrl = "https://cgnluketkpgphrbjjghw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbmx1a2V0a3BncGhyYmpqZ2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwMjA2NzIsImV4cCI6MjAwNjU5NjY3Mn0.Gjjh5OIBw0a4y9b_y4PWl7BufucT0LKvtkC3Ov_pZtY"

export const supabase = createClient(supabaseUrl, supabaseKey)