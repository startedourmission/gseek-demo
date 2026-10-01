import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { Mark } from "@/components/Illustrations";
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
    <header className="nav">
      <div className="container nav__in">
        <Link className="brand" href="/" aria-label="GSEEK 홈">
          <Mark />
          <span>GSEEK</span>
        </Link>
        <nav className="nav__links">
          <Link className="nav__link nav__link--hide-sm" href="/" aria-current={here("home")}>
            소개
          </Link>
          <Link className="nav__link" href="/faq" aria-current={here("faq")}>
            FAQ
          </Link>
          {user ? (
            <>
              <form action={logout}>
                <button className="nav__link nav__link--hide-sm" type="submit">
                  로그아웃
                </button>
              </form>
              <Link className="btn btn--primary" href="/member">
                내 질문
              </Link>
            </>
          ) : (
            <>
              <Link className="nav__link" href="/login" aria-current={here("login")}>
                로그인
              </Link>
              <Link className="btn btn--primary" href="/signup">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
