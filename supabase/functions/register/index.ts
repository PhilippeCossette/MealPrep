// supabase/functions/register/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    // 1. Parse the request body
    const { email, password, fullName } = await req.json();

    // 2. Create a Supabase "Admin" client
    // We use the SERVICE_ROLE_KEY to bypass security rules so we can create users directly
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 3. Create the user in Supabase Auth
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Set to false if you want them to verify email first
      user_metadata: { full_name: fullName },
    });

    if (userError) throw userError;

    // 4. (Optional) Create a row in your public 'profiles' table
    if (userData.user) {
      const { error: profileError } = await supabaseAdmin.from('profiles').insert({
        id: userData.user.id,
        full_name: fullName,
        email: email,
      });

      if (profileError) throw profileError;
    }

    // 5. Success!
    return new Response(
      JSON.stringify({ message: 'User created successfully', user: userData.user }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
