/* App Service Easy Auth exposes the signed-in user's claims at /.auth/me. */
document.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("main");
  if (!main || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

  try {
    const response = await fetch("/.auth/me", { credentials: "include" });
    if (!response.ok) throw new Error("Authentication endpoint unavailable");
    const users = await response.json();
    const user = users[0];
    if (!user) {
      main.innerHTML = `
        <section class="section">
          <div class="wrap">
            <div class="admin-notice">
              <strong>Sign-in required.</strong>
              Sign in with an authorized CCM Microsoft account to access this workspace.
              <a href="/.auth/login/aad?post_login_redirect_uri=/admin.html">Sign in with Microsoft</a>
            </div>
          </div>
        </section>`;
      return;
    }
    const claims = user?.user_claims || [];
    const claim = name => claims.find(item => item.typ === name)?.val || "";
    const groupValues = claims
      .filter(item => item.typ === "groups" || item.typ.endsWith("/claims/groups"))
      .flatMap(item => item.val.split(" "));
    const roles = claim("roles").split(" ").filter(Boolean);
    const allowed = groupValues.includes(CCM_CONFIG.entra.adminGroupId)
      || groupValues.includes(CCM_CONFIG.entra.mediaDirectorGroupId)
      || roles.includes("Administrator")
      || roles.includes("MediaDirector");

    if (!allowed) {
      main.innerHTML = `
        <section class="section">
          <div class="wrap">
            <div class="admin-notice">
              <strong>Admin access required.</strong>
              Your Microsoft account is signed in, but it is not a member of an authorized CCM admin group.
            </div>
          </div>
        </section>`;
      return;
    }

    document.body.dataset.adminRole = groupValues.includes(CCM_CONFIG.entra.adminGroupId) || roles.includes("Administrator")
      ? "Administrator" : "Media Director";
  } catch (error) {
    main.innerHTML = `
      <section class="section">
        <div class="wrap">
          <div class="admin-notice">
            <strong>Sign-in required.</strong>
            Sign in with an authorized CCM Microsoft account to access this workspace.
            <a href="/.auth/login/aad?post_login_redirect_uri=/admin.html">Sign in with Microsoft</a>
          </div>
        </div>
      </section>`;
  }
});