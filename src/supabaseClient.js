import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mqszkrjfhafxiumekevo.supabase.co'
const supabaseAnonKey = 'sb_publishable_vUnZsYpn_6_h11EwZOabqA_SY2IzQkd'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)