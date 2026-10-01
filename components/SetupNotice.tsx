// 환경변수를 아직 넣지 않았을 때 보여주는 안내
export function SetupNotice() {
  return (
    <p className="notice notice--info">
      Supabase가 아직 연결되지 않았어요. <code>.env.local</code>에 <code>NEXT_PUBLIC_SUPABASE_URL</code>과{" "}
      <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>를 넣고 서버를 다시 실행해 주세요.
    </p>
  );
}
