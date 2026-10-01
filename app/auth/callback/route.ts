import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 인증 메일의 링크를 누르면 이 주소로 돌아옵니다.
// 링크에 담긴 code를 로그인 세션으로 바꾼 뒤 회원 페이지로 보냅니다.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/member";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next.startsWith("/") ? next : "/member"}`);
  }

  return NextResponse.redirect(`${origin}/login?error=confirm`);
}
