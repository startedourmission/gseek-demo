import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

async function getUser() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function Nav({ current }: { current?: "home" | "faq" | "member" | "login" | "signup" }) {
  const user = await getUser();
  const here = (key: string) => (current === key ? "page" : undefined);

  return (
    <nav className="nav">
      <Link className="logo" href="/" aria-label="GSEEK 홈">
        G
      </Link>
      <div className="nav__links">
        <Link className="pill pill--hide-md" href="/" aria-current={here("home")}>
          소개
        </Link>
        <Link className="pill" href="/faq" aria-current={here("faq")}>
          FAQ
        </Link>
        {user ? (
          <>
            <form action={logout}>
              <button className="pill pill--hide-md" type="submit">
                로그아웃
              </button>
            </form>
            <Link className="pill pill--solid" href="/member">
              내 질문
            </Link>
          </>
        ) : (
          <>
            <Link className="pill pill--hide-md" href="/login" aria-current={here("login")}>
              로그인
            </Link>
            <Link className="pill pill--solid" href="/signup">
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
