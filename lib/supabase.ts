import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error("Supabase 접속 정보가 없습니다. .env.example을 참고해 .env.local을 만들어 주세요.");
}

// 로그인 없이 공개 데이터만 읽으므로 세션을 저장하지 않는다
export const supabase = createClient(url, key, { auth: { persistSession: false } });
