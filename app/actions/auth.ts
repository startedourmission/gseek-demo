"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string; message?: string; email?: string } | undefined;

// Supabase 오류 메시지를 수강생이 이해하기 쉬운 한국어로 바꿉니다.
function toKorean(message: string) {
  if (message.includes("Invalid login credentials")) return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (message.includes("Email not confirmed")) return "이메일 인증이 아직 완료되지 않았습니다. 메일함의 인증 링크를 눌러 주세요.";
  if (message.includes("User already registered")) return "이미 가입된 이메일입니다. 로그인해 주세요.";
  if (message.includes("Password should be")) return "비밀번호는 6자 이상이어야 합니다.";
  if (message.includes("Invalid API key")) return "Supabase 연결 키가 올바르지 않습니다. 환경변수를 확인해 주세요.";
  if (message.includes("rate limit")) return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  return message;
}

export async function signup(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "이메일과 비밀번호를 입력해 주세요.", email };
  if (password.length < 6) return { error: "비밀번호는 6자 이상이어야 합니다.", email };

  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback?next=/member` },
  });

  if (error) return { error: toKorean(error.message), email };

  // 이메일 인증을 끈 프로젝트라면 바로 로그인 상태가 됩니다.
  if (data.session) redirect("/member");

  return { message: `${email}로 인증 메일을 보냈어요. 메일의 링크를 누르면 가입이 완료됩니다.` };
}

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/member");

  if (!email || !password) return { error: "이메일과 비밀번호를 입력해 주세요.", email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: toKorean(error.message), email };

  revalidatePath("/", "layout");
  redirect(next.startsWith("/") ? next : "/member");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
