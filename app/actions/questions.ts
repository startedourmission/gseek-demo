"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "./auth";

export async function askQuestion(_: FormState, formData: FormData): Promise<FormState> {
  const content = String(formData.get("content") ?? "").trim();
  if (content.length < 5) return { error: "질문을 5자 이상 입력해 주세요." };

  const supabase = await createClient();
  // user_id는 DB 기본값(auth.uid())으로 채워지고, RLS가 본인 것인지 한 번 더 확인합니다.
  const { error } = await supabase.from("questions").insert({ content });

  if (error) return { error: `질문을 저장하지 못했어요: ${error.message}` };

  revalidatePath("/member");
  return { message: "질문이 등록됐어요. 답변이 달리면 여기에서 확인할 수 있어요." };
}

export async function deleteQuestion(formData: FormData) {
  const id = Number(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("questions").delete().eq("id", id);
  revalidatePath("/member");
}
