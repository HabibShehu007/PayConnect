import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

Deno.serve(async (req) => {
  try {
    const { transactionId, userId } = await req.json();

    // 1. Verify payment with Flutterwave
    const flutterwaveRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${Deno.env.get("FLUTTERWAVE_SECRET_KEY")}`,
        },
      },
    );
    const flutterwaveData = await flutterwaveRes.json();

    if (flutterwaveData.status !== "success") {
      return new Response(
        JSON.stringify({ error: "Payment not verified" }),
        { status: 400 },
      );
    }

    const amount: number = Number(flutterwaveData.data.amount);

    // 2. Connect to Supabase with service role key
    const supabase = createClient(
      Deno.env.get("PROJECT_URL")!,
      Deno.env.get("SERVICE_ROLE_KEY")!,
    );

    // 3. Fetch current wallet_balance
    const { data: profile, error: fetchError } = await supabase
      .from("user_profile")
      .select("wallet_balance")
      .eq("id", userId)
      .single();

    if (fetchError) {
      return new Response(JSON.stringify({ error: fetchError.message }), {
        status: 500,
      });
    }

    const newBalance = Number(profile.wallet_balance) + amount;

    // 4. Update wallet_balance
    const { data, error } = await supabase
      .from("user_profile")
      .update({ wallet_balance: newBalance })
      .eq("id", userId)
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
});
